    import axios from 'axios';
    import { useState, useEffect, useRef } from 'react';
    import './Accounts_Admin.css';

    function Accounts_Admin(){
        const [accounts, setAccounts] = useState([]);
        const add_accounts = useRef();
        useEffect(() => {
            axios.get('http://127.0.0.1:8000/api/fetch').then(response => {
                setAccounts(response.data.result);
            });
        
        }, [])
        
        function addAccounts(){
            add_accounts.current.classList.toggle('add_accounts-open');
        }

        function cancel_addAccounts(){
            add_accounts.current.classList.remove('add_accounts-open');
        }
        
        
        return(
            <>
                <div className="container fixed left-44 lg:left-60  w-screen h-screen ">
                    <div>
                        <button className="fixed right-3 lg:right-16 top-12 lg:top-8 bg-[#A52A2A] w-28 h-7 lg:h-8  text-sm  rounded-[10px] text-white hover:bg-[#351010] transition duration-500" onClick={addAccounts}>Add Accounts</button>
                    </div>
                    <div className="table top-20 fixed ml-2 left-0 lg:left-[232px] border-2 border-black w-[97%] lg:w-[77%] h-[70vh] lg:ml-10">
                        <table className="w-full">
                            <th>
                                <div className="head flex justify-evenly border-b-[1px] border-black">
                                    <td className="w-[50px] lg:w-[50px] font-bold">#</td>
                                    <td className="w-[200px] lg:w-[250px] font-bold">Email</td>
                                    <td className="w-[100px] lg:w-[150px] font-bold">Username</td>
                                    <td className="w-[100px] lg:w-[100px] font-bold">Password</td>
                                    <td className="w-[150px] lg:w-[150px] font-bold">User_ID</td>
                                    <td className="w-[110px] lg:w-[150px] font-bold">Account Type</td>
                                    <td className="w-[150px] lg:w-[200px] font-bold">Action</td>
                                </div>
                            </th>
                            <tr>
                                {accounts.map((account, index) => (
                                    <div className="row flex justify-evenly  text-center h-10 items-center border-b-[1px] border-black">
                                        <td className="w-[50px] lg:w-[50px]">{index + 1}</td>
                                        <td className="w-[200px] lg:w-[250px]">{account.email}</td>
                                        <td className="w-[100px] lg:w-[150px]">{account.username}</td>
                                        <td className="w-[100px] lg:w-[100px]">**********</td>
                                        <td className="w-[150px] lg:w-[150px]">{account.user_id}</td>
                                        <td className="w-[110px] lg:w-[150px]">{account.account_type}</td>
                                        <td className="w-[150px] lg:w-[200px]">
                                            <button className="bg-[#2319E1] text-white w-[60px] lg:w-[90px] mr-1 rounded-[5px] hover:bg-[#221f61] transition duration-500">Edit</button>
                                            <button className="bg-[#FF0000] text-white w-[60px] lg:w-[90px] rounded-[5px] hover:bg-[#792424] transition duration-500">Delete</button>
                                        </td>
                                    </div>
                                ))}
                            </tr>
                        </table>
                    </div>
                </div>
                {/* ADD ACCOUNTS */}
                
                <div className="add_accounts" ref={add_accounts}>
                    <h1 className='font-bold text-xl text-center mt-2'>Create Account</h1>
                    <form className='flex flex-col items-center'>
                        
                        <div className="email flex flex-col mt-5">
                            <label htmlFor="">Email:</label>
                            <input type="email" className='border-black border-[1px] w-56 rounded-[5px]'  required/>
                        </div>
                        <div className="username flex flex-col mt-3">
                            <label htmlFor="">Username:</label>
                            <input type="username" className='border-black border-[1px] w-56 rounded-[5px]'  required/>
                        </div>
                        <div className="password flex flex-col mt-3">
                            <label htmlFor="">Password:</label>
                            <input type="password" className='border-black border-[1px] w-56 rounded-[5px]'  required/>
                        </div>
                        <div className="rePass flex flex-col mt-3">
                            <label htmlFor="">Re-enter password:</label>
                            <input type="password" className='border-black border-[1px] w-56 rounded-[5px]'  required />
                        </div>
                        <div className="accountType flex flex-col mt-3">
                            <label htmlFor="">Account Type:</label>
                            <select name="" id="" className='border-black border-[1px] cursor-pointer w-56 rounded-[5px]' required>
                                <option value=""></option>
                                <option value="admin">Admin</option>
                                <option value="end_user">End_User</option>
                            </select>
                        </div>
                        <div className="btn flex mt-5 w-52 justify-between">
                            <button className='bg-blue-600 text-white w-24 rounded-[5px]'>Create</button>
                            <button type="button" className='bg-red-600 text-white w-24 rounded-[5px]' onClick={cancel_addAccounts}>Cancel</button>
                        </div>
                    </form>
                </div>     

            </>
        );
    }

    export default Accounts_Admin