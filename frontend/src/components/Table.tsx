import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = (props:any) => {
  const { headers, rows, sortingFnc } = props;
  return (
    <div>
      <table className="table table-bordered table-hover">
      <TableHeader rows={rows} sortingFunction={sortingFnc}></TableHeader>
      <TableBody getData={props.getData} headers={headers} rows={rows} show2={props.show2} handleClose={props.handleClose} setResponseMessage={props.setResponseMessage}></TableBody>
      </table>
    </div>
  );
}

export default Table;