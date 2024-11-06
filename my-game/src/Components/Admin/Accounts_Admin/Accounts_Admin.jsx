    import axios from 'axios';
    import { useState, useEffect, useRef } from 'react';
    import './Accounts_Admin.css';

    function Accounts_Admin(){
        const [accounts, setAccounts] = useState([]);
        const add_accounts = useRef();
        const [email, setEmail] = useState("");
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [rePassword, setRePassword] = useState("");
        const [accountType, setAccountType] = useState("");
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const [emailTaken, setEmailTaken] = useState("");
        const [usernameTaken, setUsernameTaken] = useState("");
        const [formSubmitted, setFormSubmitted] = useState(false);
        const editAccount = useRef();
        const [editEmail, setEditEmail] = useState("");
        const [editUsername, setEditUsername] = useState("");
        const [edit_accountType, setEditAccountType] = useState("");
        const [id, setId] = useState("");
        const deleteAccount = useRef();
        const [user_id, setUser_ID] = useState("");

        useEffect(() => {
            axios.get('http://127.0.0.1:8000/api/fetch').then(response => {
                setAccounts(response.data.result);
            });
        
        }, [])
        
        function addAccounts(){
            add_accounts.current.classList.toggle('add_accounts-open');
            editAccount.current.classList.remove("edit-open");
        }

        function cancel_addAccounts(){
            add_accounts.current.classList.remove('add_accounts-open');
        }
        
        function createAccount(e){
            e.preventDefault();
            setFormSubmitted(true)
            if(password != rePassword){
                console.log("password does not match");
            }
            else{
                axios.post('http://127.0.0.1:8000/api/create_account', {
                    'email': email,
                    'username': username,
                    'password': password,
                    'account_type':accountType
                }).then(response => {
                    if(response.data.message === "Create Success"){
                        window.location.reload();
                    }
                    else if(response.data.message === "email is already taken"){
                        setEmailTaken("email is already taken");
                    }
                    else if(response.data.message === "username is already taken"){
                        setUsernameTaken("username is already taken");
                    }
                })
            }
        }

        const handleEdit = (id, email, username, account_type) => {
            editAccount.current.classList.toggle("edit-open");
            setId(id);
            setEditEmail(email);
            setEditUsername(username);
            setEditAccountType(account_type);
            add_accounts.current.classList.remove('add_accounts-open');
        }

        function cancel_EditAccounts(){
            editAccount.current.classList.remove("edit-open");
        }

        function update_account(e){
            e.preventDefault();
            setFormSubmitted(true)
            axios.put(`http://127.0.0.1:8000/api/edit_account/${id}`,{
                "email":editEmail,
                "username":editUsername,
                "account_type":edit_accountType
            }).then(response => {
                if(response.data.message === "update success"){
                    window.location.reload();
                }
                else if(response.data.message === "email is already taken"){
                    setEmailTaken("email is already taken");
                }
                else if(response.data.message === "username is already taken"){
                    setUsernameTaken("username is already taken");
                }
            })
        }

        const handleDelete = (user_id) =>{
            deleteAccount.current.classList.toggle("delete-open");
            setUser_ID(user_id);
        }

        function no(){
            deleteAccount.current.classList.remove("delete-open");
        }

        function yes(){
            axios.delete(`http://127.0.0.1:8000/api/delete_account/${user_id}`).then(response => {
                if(response.data.message === "Delete success"){
                    window.location.reload();
                }
            })
        }
        return(
            <>
                <div className="container fixed left-44 lg:left-60  w-screen h-screen ">
                    <h1 className='fixed font-bold text-2xl left-[50%] mt-3'>Accounts</h1>
                    <div>
                        <button className="fixed right-3 lg:right-16 top-12 lg:top-8 bg-[#A52A2A] w-28 h-7 lg:h-8  text-sm  rounded-[10px] text-white hover:bg-[#351010] transition duration-500" onClick={addAccounts}>Add Accounts</button>
                    </div>
                    <div className="table top-20 fixed ml-2 left-0 lg:left-[232px] border-2 border-black w-[97%] lg:w-[77%] lg:ml-10">
                        <table className="w-full">
                            <th className=''>
                                <div className="head flex justify-evenly border-b-[1px] border-black h-10 items-center bg-gray-400">
                                    <td className="w-[50px] lg:w-[50px] font-bold">#</td>
                                    <td className="w-[200px] lg:w-[250px] font-bold">Email</td>
                                    <td className="w-[100px] lg:w-[150px] font-bold">Username</td>
                                    <td className="w-[100px] lg:w-[100px] font-bold">Password</td>
                                    <td className="w-[150px] lg:w-[150px] font-bold">User_ID</td>
                                    <td className="w-[110px] lg:w-[150px] font-bold">Account Type</td>
                                    <td className="w-[150px] lg:w-[200px] font-bold">Action</td>
                                </div>
                            </th>
                            <tr className=' overflow-scroll'>
                                <div className="row h-[500px] overflow-y-scroll">
                                    {accounts.map((account, index) => (
                                        <div className="row flex justify-evenly  text-center h-10 items-center border-b-[1px] border-black">
                                            <td className="w-[50px] lg:w-[50px]">{index + 1}</td>
                                            <td className="w-[200px] lg:w-[250px]">{account.email}</td>
                                            <td className="w-[100px] lg:w-[150px]">{account.username}</td>
                                            <td className="w-[100px] lg:w-[100px]">**********</td>
                                            <td className="w-[150px] lg:w-[150px]">{account.user_id}</td>
                                            <td className="w-[110px] lg:w-[150px]">{account.account_type}</td>
                                            <td className="w-[150px] lg:w-[200px]">
                                                <button className="bg-[#2319E1] text-white w-[60px] lg:w-[90px] mr-1 rounded-[5px] hover:bg-[#221f61] transition duration-500" onClick={() => handleEdit(account.id, account.email, account.username, account.account_type)}>Edit</button>
                                                <button className="bg-[#FF0000] text-white w-[60px] lg:w-[90px] rounded-[5px] hover:bg-[#792424] transition duration-500" onClick={() => handleDelete(account.user_id)}>Delete</button>
                                            </td>
                                        </div>
                                    ))}
                                </div>
                            </tr>
                        </table>
                    </div>
                </div>
                {/* ADD ACCOUNTS */}
                
                <div className="add_accounts" ref={add_accounts}>
                    <h1 className='font-bold text-xl text-center mt-2'>Create Account</h1>
                    <form className='flex flex-col items-center' onSubmit={createAccount}>
                        <div className="email flex flex-col mt-5">
                            <label htmlFor="">Email:</label>
                            <input type="email" className='border-black border-[1px] w-56 rounded-[5px]' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        {formSubmitted && emailTaken && <p className="text-red-700 text-sm w-[250px] ml-7">Email is already taken.</p>}
                        <div className="username flex flex-col mt-3">
                            <label htmlFor="">Username:</label>
                            <input type="username" className='border-black border-[1px] w-56 rounded-[5px]' value={username} onChange={(e) => setUsername(e.target.value)}  required/>
                        </div>
                        {formSubmitted && usernameTaken && <p className="text-red-700 text-sm w-[250px] ml-7">Username is already taken.</p>}
                        <div className="password flex flex-col mt-3">
                            <label htmlFor="">Password:</label>
                            <input type="password" className='border-black border-[1px] w-56 rounded-[5px]' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                        {!passwordRegex.test(password) && <p className="text-red-700 text-sm w-[250px] ml-7">Password must be at least 8 characters long, contain at least one uppercase letter and one number.</p>}
                        <div className="rePass flex flex-col mt-3">
                            <label htmlFor="">Re-enter password:</label>
                            <input type="password" className='border-black border-[1px] w-56 rounded-[5px]' value={rePassword} onChange={(e) => setRePassword(e.target.value)} required />
                        </div>
                        {password != rePassword && <p className="text-red-700 text-sm w-[250px] ml-7">Password does not match.</p>}
                        <div className="accountType flex flex-col mt-3">
                            <label htmlFor="">Account Type:</label>
                            <select name="" id="" className='border-black border-[1px] cursor-pointer w-56 rounded-[5px]' value={accountType} onChange={(e) => setAccountType(e.target.value)} required>
                                <option value=""></option>
                                <option value="admin">Admin</option>
                                <option value="end_user">End_User</option>
                            </select>
                        </div>
                        <div className="btn flex mt-5 w-52 justify-between">
                            <button className='bg-blue-600 text-white w-24 rounded-[5px] hover:bg-blue-900 transition duration-500'>Create</button>
                            <button type="button" className='bg-red-600 text-white w-24 rounded-[5px] hover:bg-red-900 transition duration-500' onClick={cancel_addAccounts}>Cancel</button>
                        </div>
                    </form>
                </div>   
                
                <div className="edit" ref={editAccount}>
                    <h1 className='font-bold text-xl text-center mt-2'>Edit Account</h1>
                    <form className='flex flex-col items-center' onSubmit={update_account}>
                        <div className="id flex flex-col mt-5">
                            <label htmlFor="">Email:</label>
                            <input type="email" className='border-black border-[1px]  w-56 rounded-[5px]' value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                        </div>
                        {formSubmitted && emailTaken && <p className="text-red-700 text-sm w-[250px] ml-7">Email is already taken.</p>}
                        <div className="username flex flex-col mt-5">
                            <label htmlFor="">Username:</label>
                            <input type="text" className='border-black border-[1px]  w-56 rounded-[5px]' value={editUsername} onChange={(e) => setEditUsername(e.target.value)}/>
                        </div>
                        {formSubmitted && usernameTaken && <p className="text-red-700 text-sm w-[250px] ml-7">Username is already taken.</p>}
                        <div className="account_type flex flex-col mt-5">
                            <label htmlFor="">Account Type:</label>
                            <select className='border-black border-[1px] cursor-pointer w-56 rounded-[5px]' value={edit_accountType} onChange={(e) => setEditAccountType(e.target.value)}>
                                <option value=""></option>
                                <option value="admin">Admin</option>
                                <option value="end_user">End_User</option>
                            </select>
                        </div>
                        <div className="btn flex mt-5 w-52 justify-between">
                            <button className='bg-blue-600 text-white w-24 rounded-[5px] hover:bg-blue-900 transition duration-500'>Edit</button>
                            <button type="button" className='bg-red-600 text-white w-24 rounded-[5px] hover:bg-red-900 transition duration-500' onClick={cancel_EditAccounts}>Cancel</button>
                        </div>
                    </form>
                </div> 

                <div className="delete" ref={deleteAccount}>
                    <div className="content flex flex-col items-center h-56">
                        <h1 className='font-bold text-2xl mt-5'>Are you sure?</h1>
                        <p className='text-center w-[350px] mt-3'>Are you sure you want to delete this account? this account cannot be restored.</p>
                        <div className="btn flex justify-between w-[230px] mt-10">
                            <button className='bg-red-500 w-[100px] text-white rounded-[5px] hover:bg-red-900 transition duration-[0.5s]' onClick={yes}>Yes</button>
                            <button className='bg-blue-500 w-[100px] text-white rounded-[5px] hover:bg-blue-900 transition duration-[0.5s]' onClick={no}>No</button>
                        </div>
                    </div>
                </div>     

            </>
        );
    }

    export default Accounts_Admin