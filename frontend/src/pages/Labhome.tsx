import StaffList from "./StaffList";
import KitList from "./KitList";



function Labhome(){

    return ( <>
    
        <h2>Welcome to Lab Staff/Admin Page</h2>

    <KitList />
     <br></br>
     <h3>Features</h3>
        <div>
        <a href="/Home">Logout </a>
        </div>
        <div>
        <a href="/staff-list">Staff List</a>
        </div>
        <div>
        <a href="/allot-kit">Allot Kits</a>
        </div>


    </>);

}

export default Labhome