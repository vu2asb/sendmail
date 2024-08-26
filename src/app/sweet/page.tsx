"use client";

import Swal from "sweetalert2";

export default function page() {
    function sweet(){
        console.log("page loaded");
        // alert("You clicked the button!");
        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
    }
sweet();
  
  return <div>sweetalert2 Demo</div>;
};


