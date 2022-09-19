import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

const TableHeader = (props: any) => {
  let [status, setStatus] = useState({
    name: false,
    date: false
  })
  const sorting = (type: String, status: string) => {
    let data;
    let setNewStatus = {
      name: false,
      date: false
    }
    if (type === "date") {
      if (status === "asc") {
        data = props.rows.sort(function (a: any, b: any) {
          let keyA = new Date(a.project_date),
            keyB = new Date(b.project_date);
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        })
        setNewStatus = {
          name: false,
          date: false
        }
      }
      else {
        data = props.rows.sort(function (a: any, b: any) {
          let keyA = new Date(a.project_date),
            keyB = new Date(b.project_date);
          if (keyA < keyB) return 1;
          if (keyA > keyB) return -1;
          return 0;
        })
        setNewStatus = {
          name: false,
          date: true
        }
      }
    } else {
      if (status === "asc") {
        data = props.rows.sort(function (a: any, b: any) {
          const name1 = a.project.name.toUpperCase();
          const name2 = b.project.name.toUpperCase();

          let comparison = 0;

          if (name1 > name2) {
            comparison = 1;
          } else if (name1 < name2) {
            comparison = -1;
          }
          return comparison;
        })
        setNewStatus = {
          name: false,
          date: false
        }
      }
      else {
        data = props.rows.sort(function (a: any, b: any) {
          const name1 = a.project.name.toUpperCase();
          const name2 = b.project.name.toUpperCase();

          let comparison = 0;

          if (name1 > name2) {
            comparison = -1;
          } else if (name1 < name2) {
            comparison = 1;
          }
          return comparison;
        })
        setNewStatus = {
          name: true,
          date: false
        }
      }

    }
    setStatus(setNewStatus);
    props.sortingFunction(data)
  }


  return (
    <thead className="thead-dark" key="header-1">
      <tr className="text-center" key="header-0">
        <th>User Id</th>
        <th>Project Id</th>
        <th>Project Name
          {
            status.name ? <BsFillCaretUpFill onClick={() => sorting("name", "asc")} /> : <BsFillCaretDownFill onClick={() => sorting("name", "desc")} />
          }
        </th>
        <th>Date
          {
            status.date ? <BsFillCaretUpFill onClick={() => sorting("date", "asc")} /> : <BsFillCaretDownFill onClick={() => sorting("date", "desc")} />
          }
        </th>
        <th>Permission</th>
      </tr>
    </thead>
  );
}

export default TableHeader;