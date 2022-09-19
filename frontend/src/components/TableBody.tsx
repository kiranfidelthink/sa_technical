import "bootstrap/dist/css/bootstrap.min.css";
import DropDown from "./DropDown";


const TableBody = (props: any) => {
  const { headers, rows } = props;
  const showSpinner = rows === null;

  function buildRow(row: any, headers: any, realIndex: any) {
    return (
      <tr key={row.id}>
        {row[3] === "Read" ? <></> : <>
          {row.map((value: any, index: number) => {

            return (<>
              {index !== 5 ? <td align="center" key={index}>
                {index === 4 ? <DropDown getData={props.getData} rows={rows} index={realIndex} show2={props.show2} handleClose={props.handleClose} setResponseMessage={props.setResponseMessage} /> : value}
              </td> : ""}</>
            );

          })}
        </>}
      </tr>
    );
  }

  return (
    <tbody>
      {showSpinner && (
        <tr key="spinner-0">
          <td colSpan={5} className="text-center">
            <div className="spinner-border" role="status">
              {/* <span className="sr-only">Loading...</span> */}
            </div>
          </td>
        </tr>
      )}
      {!showSpinner &&
        rows &&
        rows.map((value: any, index: any) => {
          return buildRow(Object.values(value), headers, index);
        })}
    </tbody>
  );
};

export default TableBody;
