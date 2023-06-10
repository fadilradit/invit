import React, {Component} from "react";
import { getDatabase, ref,onValue} from "firebase/database";
import Swal from 'sweetalert2'

import './Dashboard.css'

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            nama: "",
            link: window.location.origin,
            dataPesan:{},
            dataKey: [],
            password: ""
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData = () => {

        const db = ref(getDatabase(), "pesan");
        const starCountRef = db

        onValue(starCountRef, (snapshot) => {
            
            if(snapshot.exists()){
                        // console.log(snapshot.val());
                        let data = snapshot.val()
                        let pesanItem = {...data}
        
                        this.setState({
                            dataPesan: pesanItem,
                            dataKey: Object.keys(pesanItem)
                        })
        
                    }else{
                        console.log("no data");
                    }

        })

        // get(child(db, "pesan"))
        // .then((snapshot) => {
        //     if(snapshot.exists()){
        //         console.log(snapshot.val());
        //         let data = snapshot.val()
        //         let pesanItem = {...data}

        //         this.setState({
        //             dataPesan: pesanItem,
        //             dataKey: Object.keys(pesanItem)
        //         })

        //     }else{
        //         console.log("no data");
        //     }
        // })
        // .catch((error) => {
        //     console.log("Eror: " + error);
        // })

    }

    renderPesan = () => {
        
        const {dataKey, dataPesan} = this.state

        if(dataKey.length > 0){

            return dataKey.reverse().map((key) => {
                // console.log("ini key: "+key);
                // console.log("ini data yang sudah map: "+dataPesan[key].name);
                return(
                    <div className = "pesan-itemDashboard" id = "pesan-itemDashboard" >
                        <h1>{dataPesan[key].name}</h1>
                        <p>{dataPesan[key].message}</p>
                    </div>
                )
                
            })

        }else{
            // console.log("kosong");
           return <h1 className = "kosong" >Belum ada pesan</h1>
        }

    }

    aButton(){
        const {nama} = this.state
        const visitor = this.state.nama.split(" ").join("_")
        if(visitor === "" || null || undefined){
            return(
                <a style = {{pointerEvents: "none"}}  href = {`https://api.whatsapp.com/send/?phone&text=Assalamualaikum%20warahmatullahi%20wabarakatuh%0A%0ADear%20${nama}%2C%0A%0ATanpa%20mengurangi%20rasa%20hormat%2C%20izin%20kan%20kami%20mengundang%20Bapak%2FIbu%2FSaudara%2FI%20untuk%20hadir%20pada%20acara%20pernikahan%20kami%20yang%20akan%20diselenggarakan%20pada%3A%0A%0AKlik%20link%20undangan%3A%0A${this.state.link+"/"+"#"+"/"+"invite"+"/"+visitor}%2F%0A%0ASuatu%20kebahagiaan%20bagi%20kami%20apabila%20Bapak%2FIbu%2FSaudara%2FI%20dapat%20turut%20hadir%20dan%20memberi%20doa%20restu%20di%20hari%20bahagia%20kami.%0A%0AWassalamu%27alaikum%20warahmatullahi%20wabarakatu%0A%0Ayang%20berbahagia%0A%0ALisa%20%26%20Fadil%0A%0ATerimakasih`} target = "_blank" >
                    Kirim
                </a>
            )
        }else{
            return(
                <a style = {{pointerEvents: "all"}}  href = {`https://api.whatsapp.com/send/?phone&text=Assalamualaikum%20warahmatullahi%20wabarakatuh%0A%0ADear%20${nama}%2C%0A%0ATanpa%20mengurangi%20rasa%20hormat%2C%20izin%20kan%20kami%20mengundang%20Bapak%2FIbu%2FSaudara%2FI%20untuk%20hadir%20pada%20acara%20pernikahan%20kami%20yang%20akan%20diselenggarakan%20pada%3A%0A%0AKlik%20link%20undangan%3A%0A${this.state.link+"/"+"%23/invite"+"/"+visitor}%2F%0A%0ASuatu%20kebahagiaan%20bagi%20kami%20apabila%20Bapak%2FIbu%2FSaudara%2FI%20dapat%20turut%20hadir%20dan%20memberi%20doa%20restu%20di%20hari%20bahagia%20kami.%0A%0AWassalamu%27alaikum%20warahmatullahi%20wabarakatu%0A%0Ayang%20berbahagia%0A%0ALisa%20%26%20Fadil%0A%0ATerimakasih`} target = "_blank" >
                    Kirim
                </a>
            )
        }
    }

    getInHandler = () => {

        const  password = this.state.password

        if(password === "pagiboss"){
            window.scroll(0,0)

            const modal = document.querySelector('div.dash-modal')

            modal.classList.add('hide')
        }else{
            Swal.fire({
                toast: true,
                title: "Password anda salah",
                icon: 'info',
                confirmButtonColor: '#4A7572',
                confirmButtonText: 'Oke'
              })
        }

    }

    render(){
        // console.log(this.state.nama.split(' ').join("+"));
        return(
            <div className = "dashboard" id = "dashboard" >

                <h1>Fadil-Lisa Web Invitation Dashboard</h1>
                <input placeholder = "Masukan Nama Tamu Undangan" value = {this.state.nama} onChange = {(e) => {this.setState({nama: e.target.value})}} />
                {this.aButton()}

                <h2>Pesan Dari Undangan</h2>

                <div className = "pesan-dashboard" id = "pesan-dashboard" >

                {this.renderPesan()}

                </div>

                <div className = "dashboard-modal" id = "dashboard-modal" >

                </div>

                {/* <div className = "pesan-dashboard" id = "pesan-dashboard" >

                    {this.renderPesan()}

                </div> */}

                <div className = "dash-modal" id = "dash-modal" >
                    <input type = "password" placeholder = "Masukan Password" onChange = {(e) => {this.setState({password: e.target.value})}} />
                    <button onClick = {this.getInHandler} >Get In</button>
                </div>

            </div>
        )
    }

}

export default Dashboard;


// https://api.whatsapp.com/send/?phone&text=Assalamualaikum%20warahmatullahi%20wabarakatuh%0A%0ADear%20fulan%2C%0A%0ATanpa%20mengurangi%20rasa%20hormat%2C%20izin%20kan%20kami%20mengundang%20Bapak%2FIbu%2FSaudara%2FI%20untuk%20hadir%20pada%20acara%20pernikahan%20kami%20yang%20akan%20diselenggarakan%20pada%3A%0A%0AKlik%20link%20undangan%3A%0Ahttps%3A%2F%2Fpokedex-fadilradit.herokuapp.com%2F%0A%0ASuatu%20kebahagiaan%20bagi%20kami%20apabila%20Bapak%2FIbu%2FSaudara%2FI%20dapat%20turut%20hadir%20dan%20memberi%20doa%20restu%20di%20hari%20bahagia%20kami.%0A%0AWassalamu%27alaikum%20warahmatullahi%20wabarakatu%0A%0Ayang%20berbahagia%0A%0ALisa%20%26%20Fadil%0A%0ATerimakasih