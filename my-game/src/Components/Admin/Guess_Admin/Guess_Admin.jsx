
function Guess_Admin(){
    return(
        <>
             <div className="container fixed left-44 lg:left-60  w-screen h-screen ">
                <div>
                    <button className="fixed right-3 lg:right-16 top-12 lg:top-8 bg-[#A52A2A] w-36 h-7 lg:h-8  text-sm  rounded-[10px] text-white hover:bg-[#351010] transition duration-500">Add Guess Questions</button>
                    <hr className="fixed border-[1px] border-black top-20 ml-2 left-0 lg:left-96 w-[97%] lg:w-[62%]"/>
                </div>
                <div className="table top-20 fixed ml-2 left-0 lg:left-[232px] border-2 border-black w-[97%] lg:w-[77%] h-[50vh] lg:ml-10">
                    <table className="w-full">
                         <th>
                            <div className="head flex justify-evenly border-b-[1px] border-black">
                                <td className="w-[50px] lg:w-[50px] font-bold">#</td>
                                <td className="w-[200px] lg:w-[250px] font-bold">Pictures</td>
                                <td className="w-[100px] lg:w-[150px] font-bold">Answer</td>
                                <td className="w-[150px] lg:w-[100px] font-bold">Question-ID</td>
                                <td className="w-[150px] lg:w-[200px] font-bold">Action</td>
                            </div>
                        </th>
                        <tr>
                            <div className="row flex justify-evenly  text-center h-10 items-center border-b-[1px] border-black">
                                <td className="w-[50px] lg:w-[50px]">100</td>
                                <td className="w-[200px] lg:w-[250px]">example pictures</td>
                                <td className="w-[100px] lg:w-[150px]">Tae</td>
                                <td className="w-[150px] lg:w-[150px]">Guess-123456</td>
                                <td className="w-[150px] lg:w-[200px]">
                                    <button className="bg-[#2319E1] text-white w-[60px] lg:w-[90px] mr-1 rounded-[5px] hover:bg-[#221f61] transition duration-500">Edit</button>
                                    <button className="bg-[#FF0000] text-white w-[60px] lg:w-[90px] rounded-[5px] hover:bg-[#792424] transition duration-500">Delete</button>
                                </td>
                            </div>
                        </tr>
                    </table>
                </div>
                <div className="">
                    <div className="info fixed bottom-32 left-10 lg:left-64">
                        <p>Showing 6 out of 100 entries.</p>
                    </div>
                    <div className="btn fixed bottom-32 right-7">
                        <div className="buttons flex justify-between w-[300px]">
                            <button>Previous</button>
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                            <button>4</button>
                            <button>5</button>
                            <button>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Guess_Admin