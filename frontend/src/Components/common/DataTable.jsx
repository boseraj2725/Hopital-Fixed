import "./DataTable.css";

function DataTable({

    columns,

    data,

}) {

    return (

        <div className="table-wrapper">

            <table className="data-table">

                <thead>

                    <tr>

                        {columns.map((col, index) => (

                            <th key={index}>

                                {col}

                            </th>

                        ))}

                    </tr>

                </thead>

                <tbody>

                    {data.length > 0 ? (

                        data.map((row, index) => (

                            <tr key={index}>

                                {row.map((item, i) => (

                                    <td key={i}>

                                        {item}

                                    </td>

                                ))}

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={columns.length}
                                className="no-data"
                            >

                                No Data Found

                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default DataTable;