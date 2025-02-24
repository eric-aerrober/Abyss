import React from 'react';
import { Link, useNavigate } from 'react-router';

interface DatabaseTableProps {
    table: string;
    records: Record<string, any>[];
}

export function TableKeyValue({ table, column, value }: { table: string; column: string; value: string }) {
    if (column === 'threadId') {
        return (
            <Link to={`/database/id/messageThread/record/${value}`} className="text-primary-400 underline hover:text-primary-200">
                {value}
            </Link>
        );
    }

    if (column === 'id') {
        return (
            <Link to={`/database/id/${table}/record/${value}`} className="text-primary-400 underline hover:text-primary-200">
                {value}
            </Link>
        );
    }

    if (!value.toString().includes('Object')) {
        return value.toString();
    }

    if (typeof value === 'object') {
        return JSON.stringify(value);
    }

    return value ? value.toString() : '-';
}

export function DatabaseTable({ table, records }: DatabaseTableProps) {
    const navigate = useNavigate();

    if (!records || records.length === 0) {
        return <div className="text-text-500">No records found</div>;
    }

    // Get column headers from first record
    const columns = Object.keys(records[0]);

    return (
        <div className="w-full overflow-x-auto border border-primary-800/50 rounded-sm">
            <table className="w-full border-collapse text-xs overflow-hidden rounded-sm border border-primary-800/50">
                <thead>
                    <tr className="bg-primary-950/20 capitalize">
                        {columns.map((column, colIndex) => (
                            <th key={column} className="p-1.5 text-left text-text-200 font-medium border border-primary-800/50">
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="hover:bg-primary-900/30 cursor-pointer truncate"
                            onClick={() => navigate(`/database/id/${table}/record/${record.id}`)}
                        >
                            {columns.map((column, colIndex) => (
                                <td key={column} className="p-1.5 border border-primary-800/50 text-text-300">
                                    <TableKeyValue table={table} column={column} value={record[column]} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
