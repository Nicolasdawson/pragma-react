import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export default class Export {
    static exportToCSV = async (dataSource, fileName) => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';

        if (Array.isArray(dataSource)) {
            const ws = XLSX.utils.json_to_sheet(dataSource);
            const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, fileName + fileExtension);
        }
    };
}
