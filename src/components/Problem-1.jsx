import React, { useEffect, useState } from 'react';

const Problem1 = () => {

    const [show, setShow] = useState('all');
    const [allData,setAllData]=useState([])
    const [showData,setShowData]=useState([])
    const [name,setName]=useState("")
    const [status,setStatus]=useState("")

    const handleClick = (val) => {
        setShow(val);
    }

    const handleNameChange=(e)=>{
        setName(e.target.value)
    }

    const handleStatusChange=(e)=>{
        setStatus(e.target.value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(!name.trim().length || !status.trim().length){
            return
        }
        const task={
            taskName:name,
            taskStatus:status
        }
        setAllData((prev)=>{
            return [
                ...prev,
                task
            ]
        })

        setName("")
        setStatus("")
    }

    const taskSorting=(tasks)=>{
        const sortingOrder = {
            active: 1,
            completed: 2,
            pending: 3,
            archive: 4
          };

          const sortedTask=tasks.sort((a, b) => {
            const statusA = sortingOrder[a.taskStatus.toLowerCase()];
            const statusB = sortingOrder[b.taskStatus.toLowerCase()];
          
            if (statusA < statusB) {
              return -1;
            } else if (statusA > statusB) {
              return 1;
            } else {
              return 0;
            }
          });

          return sortedTask
    }

    useEffect(()=>{

        console.log("logging from useEffect")

        if(show=="all"){
            const sortedTask=taskSorting(allData)
            console.log("sortedTask",sortedTask)
            setShowData(sortedTask)
        }
        else if(show=="active"){
            const activeData=allData.filter((data)=>data.taskStatus.toLowerCase()=="active")
            setShowData(activeData)
        }
        else if(show=="completed"){
            const completeData=allData.filter((data)=>data.taskStatus.toLowerCase()=="completed")
            setShowData(completeData)
        }

    },[allData,show])

    console.log(allData)

    

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form onSubmit={handleSubmit} className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input onChange={handleNameChange} value={name} type="text" className="form-control" placeholder="Name" />
                        </div>
                        <div className="col-auto">
                            <input onChange={handleStatusChange} value={status} type="text" className="form-control" placeholder="Status" />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                showData.map((data)=>(
                                    <tr>
                                    <td>{data.taskName}</td>
                                    <td>{data.taskStatus}</td>
                                </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;