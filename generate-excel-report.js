const ExcelJS = require('exceljs');
const fs = require('fs');

async function generateExcelReport() {
  const rawData = fs.readFileSync('test-results/results.json', 'utf-8');
  const results = JSON.parse(rawData);

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Test Results');

  // Header row
  sheet.columns = [
    { header: 'Test Name', key: 'title', width: 50 },
    { header: 'File', key: 'file', width: 40 },
    { header: 'Status', key: 'status', width: 12 },
    { header: 'Duration (ms)', key: 'duration', width: 15 },
    { header: 'Error', key: 'error', width: 50 },
  ];

  // Header style
  sheet.getRow(1).font = { bold: true };
  sheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF1E3A8A' },
  };
  sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

  // Recursively walk through suites → specs → tests
  function walkSuites(suites, filePath = '') {
    for (const suite of suites) {
      const currentFile = suite.file || filePath;

      if (suite.specs) {
        for (const spec of suite.specs) {
          for (const test of spec.tests) {
            const lastResult = test.results[test.results.length - 1];
            const row = sheet.addRow({
              title: spec.title,
              file: currentFile,
              status: lastResult.status.toUpperCase(),
              duration: lastResult.duration,
              error: lastResult.error ? lastResult.error.message : '',
            });

            // Color code by status
            const statusCell = row.getCell('status');
            if (lastResult.status === 'passed') {
              statusCell.font = { color: { argb: 'FF008000' }, bold: true };
            } else if (lastResult.status === 'failed') {
              statusCell.font = { color: { argb: 'FFFF0000' }, bold: true };
            } else {
              statusCell.font = { color: { argb: 'FFFFA500' }, bold: true };
            }
          }
        }
      }

      if (suite.suites) {
        walkSuites(suite.suites, currentFile);
      }
    }
  }

  walkSuites(results.suites);

  // Summary sheet
  const summarySheet = workbook.addWorksheet('Summary');
  summarySheet.columns = [
    { header: 'Metric', key: 'metric', width: 25 },
    { header: 'Value', key: 'value', width: 15 },
  ];
  summarySheet.getRow(1).font = { bold: true };

  let passed = 0, failed = 0, skipped = 0;
  function countStatuses(suites) {
    for (const suite of suites) {
      if (suite.specs) {
        for (const spec of suite.specs) {
          for (const test of spec.tests) {
            const status = test.results[test.results.length - 1].status;
            if (status === 'passed') passed++;
            else if (status === 'failed') failed++;
            else skipped++;
          }
        }
      }
      if (suite.suites) countStatuses(suite.suites);
    }
  }
  countStatuses(results.suites);

  summarySheet.addRow({ metric: 'Total Tests', value: passed + failed + skipped });
  summarySheet.addRow({ metric: 'Passed', value: passed });
  summarySheet.addRow({ metric: 'Failed', value: failed });
  summarySheet.addRow({ metric: 'Skipped', value: skipped });
  summarySheet.addRow({ metric: 'Report Generated', value: new Date().toLocaleString() });

  await workbook.xlsx.writeFile('test-results/HVMS_Test_Report.xlsx');
  console.log('✅ Excel report generated: test-results/HVMS_Test_Report.xlsx');
}

generateExcelReport().catch(console.error);