import React, {Component} from "react";
import { getDatabase, ref, push,onValue} from "firebase/database";
import Swal from 'sweetalert2'
import {CopyToClipboard} from 'react-copy-to-clipboard'


import './Banner.css'
import './Quotes.css'
import './Profile.css'
import './Info.css'
import './Galeri.css'
import './Prokes.css'
import './Modal.css'
import './Wish.css'

import BannerImage from '../../Image/BannerBaru.png'
import Quran from '../../Image/LOGO/Quran.png'
import Lisa from '../../Image/Lisa.jpg'
import Fadil from '../../Image/Fadil.jpg'
import Map from '../../Image/LOGO/Location.png'
import Galeri1 from '../../Image/Galeri/Coba1.jpg'
import Galeri2 from '../../Image/Galeri/Coba2.jpg'
import Galeri3 from '../../Image/Galeri/Coba3.jpg'
import Galeri4 from '../../Image/Galeri/Coba4.jpg'
import Masker from '../../Image/Prokes/Masker.png'
import Distancing from '../../Image/Prokes/Distancing.png'
import Wash from '../../Image/Prokes/Wash.png'
import Handshake from '../../Image/Prokes/NoHandshake.png'
import PlayIcon from '../../Image/LOGO/PlayIcon.png'
import PauseIcon from '../../Image/LOGO/PauseIcon.png'
import Gift from '../../Image/LOGO/Gift.png'
import Copy from '../../Image/LOGO/Copy.png'
import BCA from '../../Image/LOGO/BCA.jpg'
import BSI from '../../Image/LOGO/BSI.png'


import Circa from '../../Image/Cena.mp3'



class Invite extends Component{

    constructor(props) {
        super(props);
        this.state = {
            music : false,
            nama: "",
            pesan: "",
            dataPesan:{},
            dataKey: [],
            visitor: this.props.match.params.visitor.split("_").join(" "),
            wait: true
        }
        this.hacndleScroll = this.hacndleScroll.bind(this)
        this.openInvitation = this.openInvitation.bind(this)
    }

    componentDidMount(){
        window.addEventListener('scroll', this.hacndleScroll)
        this.getData()
        setTimeout(() => {this.setState({wait: false})}, 8000)
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
                            dataKey: Object.keys(pesanItem).reverse()
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

    hacndleScroll(event){
        // const scrollTop = event.srcElement.body.scrollTop
            // itemTranslate = Math.min(0, scrollTop)

        const pray = document.querySelector('section.quotes')
        const profile1 = document.querySelector('div.lisa')
        const profile2 = document.querySelector('div.fadil')
        const intro = document.querySelector('div.intro')
        const agenda = document.querySelector('div.agenda')
        const galeri1 = document.querySelector('img.galeri1')
        const galeri2 = document.querySelector('img.galeri2')
        const galeri3 = document.querySelector('img.galeri3')
        const galeri4 = document.querySelector('img.galeri4')

        // console.log(window.pageYOffset);
        // console.log(intro);

        if(window.pageYOffset > pray.offsetTop - 370){
            // console.log("Mantap");
            pray.classList.add('ease-in')
        }else{
            pray.classList.remove('ease-in')
        }

        if(window.pageYOffset > profile1.offsetTop - 370){
            profile1.classList.add('ease-in')
        }else{
            profile1.classList.remove('ease-in')
        }

        if(window.pageYOffset > profile2.offsetTop - 370){
            profile2.classList.add('ease-in')
        }else{
            profile2.classList.remove('ease-in')
        }

        if(window.pageYOffset > intro.offsetTop - 370){
            intro.classList.add('fade-in')
        }else{
            intro.classList.remove('fade-in')
        }

        if(window.pageYOffset > agenda.offsetTop - 370){
            agenda.classList.add('fade-in')
        }else{
            agenda.classList.remove('fade-in')
        }

        if(window.pageYOffset > galeri1.offsetTop - 370){
            galeri1.classList.add('fade-in')
        }else{
            galeri1.classList.remove('fade-in')
        }

        if(window.pageYOffset > galeri2.offsetTop - 370){
            galeri2.classList.add('fade-in')
        }else{
            galeri2.classList.remove('fade-in')
        }

        if(window.pageYOffset > galeri3.offsetTop - 370){
            galeri3.classList.add('fade-in')
        }else{
            galeri3.classList.remove('fade-in')
        }

        if(window.pageYOffset > galeri4.offsetTop - 370){
            galeri4.classList.add('fade-in')
        }else{
            galeri4.classList.remove('fade-in')
        }


    }

    playMusic = () => {
        const {music} = this.state
        const audio = document.querySelector('audio')
        //console.log(music);

        if(music){
            audio.pause()
            this.setState({music: !music})
        }else{
            audio.play()
            this.setState({music: !music})
        }
        

    }

    openInvitation(){

        window.scroll(0,0)

        const modal = document.querySelector('section.modal')
        const vid  = document.querySelector('audio')


        modal.classList.add('hide');
        this.setState({music: true})
        vid.play()

    }

    playButton(){
        const {music} = this.state
        
        if(music){
            return <img src = {PauseIcon} alt = "" />
        }else{
            return <img src = {PlayIcon} alt = "" />
        }

    }

    kirimPesan = () => {

        const {nama, pesan} = this.state
        // console.log(nama);
        // console.log(pesan);

        if(nama === "" || pesan === ""){
            Swal.fire({
                toast: true,
                title: "Tulis Nama Anda dan Pesan",
                icon: 'info',
                confirmButtonColor: '#4A7572',
                confirmButtonText: 'Oke'
              })
        }else{
            const db = getDatabase();
            push(ref(db, 'pesan'),{
                name:nama,
                message:pesan
            }).then((data) => {
                // console.log(data);
                // console.log("Nama: " + this.state.dataPesan);
                this.setState({
                    pesan: "",
                    nama:""
                })
                Swal.fire(
                    {
                      title: "Terimakasih",
                      text: "Pesan Telah Terkirim",
                      icon: "success",
                      showConfirmButton: false,
                      timer: 2500
          
                    }
                  )
                
            }).catch((error) => {
                console.log("Error: " + error);
            })
        }
        

    }

    renderPesan = () => {
        
        const {dataKey, dataPesan} = this.state

        if(dataKey.length > 0){

            return dataKey.slice(0,20).map((key) => {
                // console.log("ini key: "+key);
                // console.log("ini data yang sudah map: "+dataPesan[key].name);
                return(
                    <div className = "pesan-item" id = "pesan-item" >
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

    giftHandler(){

        const gift = document.querySelector("section.rek")

        gift.classList.toggle("fade-in")

    }

    copyHandler(){
        Swal.fire(
            {
                toast: true,
                text: "Copy to clipboard",
                icon: "success",
                timer: 1500,
                position: "bottom",
                showConfirmButton: false
            }
        )
        
        
        
        
    }

    renderModal(){
        const {wait} = this.state

        if(wait){
            return(
                <section className = "modal" id = "modal" >
                    
                    
                    <h1 className = "wait" >Please Wait . . .</h1>

                </section>
            )
        }else{
            return(
                <section className = "modal" id = "modal" >
                    
                    
                    <div className = "modal-title" id = "modal-title" >
                        <p>We're Getting Married</p>
                        <h1>Lisa</h1>
                        <h1>&</h1>
                        <h1>Fadil</h1>
                    </div>

                    <div className = "visitor" id = "visitor" >
                        <h1>Untuk:</h1>
                        <h2>{this.state.visitor}</h2>
                    </div>

                    <button onClick = {this.openInvitation} className = 'open' id = "open" >
                        Open Invitation
                    </button>

                </section>
            )
        }

    }


    render(){
        // console.log(this.props.match.params.visitor.split("_").join(" "));
        // console.log(this.state.wait);
        return(
            <main  >

                <section className = "banner" id = "banner" >

                    <div className = "banner-image" id = 'banner-image' >
                        <img src = {BannerImage} alt = "Banner" />
                    </div>
                    

                    <audio loop >
                        <source src = {Circa} type = "audio/mpeg" />
                    </audio>

                    <button className = "play-music" id = "play-music" onClick = {this.playMusic} >
                        {this.playButton()}
                    </button>

                    <button onClick = {this.giftHandler} className = "gift" id = "gift" >
                        <img src = {Gift} alt = "" />
                        Kirim Hadiah
                    </button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FFFFFF" fill-opacity="1" d="M0,128L80,144C160,160,320,192,480,176C640,160,800,96,960,90.7C1120,85,1280,139,1360,165.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
                </section>
               

                    

                <section className = "quotes" id = "quotes" >

                    <div className = "pray" id = "pray" >
                        <img src = {Quran} alt = ""  />
                        <p>"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."</p>
                        <h3>(QS Ar-Rum:21)</h3>
                    </div>

                    

                </section>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#5d948f" fill-opacity="1" d="M0,192L80,176C160,160,320,128,480,106.7C640,85,800,75,960,85.3C1120,96,1280,128,1360,144L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
                <section className = "calon" id = "calon" >
                    

                    <h1>Calon Pengantin</h1>

                    <div className = "profile lisa" id = "profile" >

                        <img src = {Lisa} alt = "" />
                        <h1>Lisa Hanifa</h1>
                        <h3>putri pertama dari</h3>
                        <h4>Bapak Martias &</h4>
                        <h4>Ibu Deswati</h4>

                    </div>

                    <div className = "profile fadil" id = "profile" >

                        <img src = {Fadil} alt = "" />
                        <h1>Fadil Raditya Nz</h1>
                        <h3>putra kedua dari</h3>
                        <h4>Bapak Benny Nazar (Alm) &</h4>
                        <h4>Ibu Febrika Fatima Caropeboka</h4>

                    </div>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#79bdb7" fill-opacity="1" d="M0,32L80,58.7C160,85,320,139,480,138.7C640,139,800,85,960,64C1120,43,1280,53,1360,58.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
                </section>
                    
                <section className = "info" id = "info" >
                    
                    <div className = "intro" id = "intro" >
                        <h1>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</h1>
                        <p>Dengan menyebut nama Allah yang maha pengasih lagi maha penyayang. Dengan senang hati kami mengundang bapak/ibu/saudara/i untuk hadir dalam pernikahan kami yang akan dilaksanakan pada:</p>
                    </div>

                    <div className = "agenda" id = "agenda" >

                        <div className = "akad" id = "akad" >

                            <h5>Akad Nikah</h5>
                            <p>Minggu, 21 November 2021</p>
                            <p>Jam 09.00 - selesai</p>
                            <p>Gg. Irja No. 52, Way Kandis, Bandar Lampung</p>

                        </div>

                        <div className = "akad" id = "akad" >

                            <h5>Resepsi</h5>
                            <p>Minggu, 21 November 2021</p>
                            <p>Jam 11.00 - selesai</p>
                            <p>Gg. Irja No. 52, Way Kandis, Bandar Lampung</p>

                        </div>

                    </div>

                    <a className = "lokasi" id = "lokasi" href = "https://www.google.com/maps/place/Gg.+Irja,+Perumnas+Way+Kandis,+Kec.+Tj.+Senang,+Kota+Bandar+Lampung,+Lampung+35131/@-5.3600186,105.289052,19z/data=!3m1!4b1!4m5!3m4!1s0x2e40c4c9e1ff60c9:0x91ecb183ab7814b1!8m2!3d-5.3600194!4d105.289599" target = "_blank" ><img src = {Map} alt = "" />Lihat Lokasi</a>
                    
                </section>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#79bdb7" fill-opacity="1" d="M0,288L80,250.7C160,213,320,139,480,128C640,117,800,171,960,208C1120,245,1280,267,1360,277.3L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>

                <section className = "galeri" id = "galeri" >

                    <h1>Our Gallery</h1>

                    <img src = {Galeri1} alt = "" className = "galeri1" />
                    <img src = {Galeri2} alt = "" className = "galeri2" />
                    <img src = {Galeri3} alt = "" className = "galeri3" />
                    <img src = {Galeri4} alt = "" className = "galeri4" />

                </section>

                <section className = "prokes" id = "prokes" >
                    <h1>INFORMASI</h1>
                    <p>Terkait adanya Covid-19 Para tamu diwajibkan mematuhi protokol kesehatan dengan: </p>
                    
                    <div className = "prokes-item" id = "prokes-item" >
                        <img src = {Masker} alt = "" />
                        <p>"Menggunakan Masker</p>

                    </div>
                    <div className = "prokes-item" id = "prokes-item" >
                        <img src = {Distancing} alt = "" />
                        <p>"Menjaga Jarak"</p>
                    </div>

                    <div className = "prokes-item" id = "prokes-item" >
                        <img src = {Wash} alt = "" />
                        <p>"Mencuci Tangan dan Menggunakan Hand Sanitizer"</p>
                    </div>

                    <div className = "prokes-item" id = "prokes-item" >
                        <img src = {Handshake} alt = "" />
                        <p>"Tidak Bersalaman"</p>
                    </div>

                </section>

                {/* <button onClick = {this.handleScrollToTop} >Scroll to top</button> */}
                {this.renderModal()}
                {/* <section className = "modal" id = "modal" >
                    
                    
                    <div className = "modal-title" id = "modal-title" >
                        <p>We're Getting Married</p>
                        <h1>Lisa</h1>
                        <h1>&</h1>
                        <h1>Fadil</h1>
                    </div>

                    <div className = "visitor" id = "visitor" >
                        <h1>Untuk:</h1>
                        <h2>{this.state.visitor}</h2>
                    </div>

                    <button onClick = {this.openInvitation} className = 'open' id = "open" >
                        Open Invitation
                    </button>

                </section> */}

                <section className = "wish" id = "wish">
                    
                    <h1>Leave Your Wishes For Us</h1>
                    <input
                    value = {this.state.nama}
                    placeholder = "Tuliskan Nama Anda"
                    onChange = {(e) => { this.setState({nama: e.target.value})}}
                    />
                    <textarea 
                    value = {this.state.pesan}
                    placeholder = "Tuliskan Pesan Disini"
                    onChange = {(e) => { this.setState({pesan: e.target.value})}}
                    />

                    <button onClick = {this.kirimPesan} >
                        Kirim Pesan
                    </button>

                </section>

                <section className = "pesan" id = "pesan" >

                    {this.renderPesan()}

                </section>

                <section className = "thanks" id = "thanks" >
                    <p>Thank You</p>
                    <h2>Lisa & Fadil</h2>
                </section>

                <section className = "rek" id = "rek" >

                    <div className = 'list-rek' >

                        <div className = "head-rek" >
                            <h1>Kirim Hadiah</h1>
                            <h3 onClick = {this.giftHandler} >Tutup</h3>
                        </div>

                        <div className = "bank" >
                            <img className = "bank-logo" src = {BCA} alt = ""  />
                            
                            <div className = 'bank-detail' >

                                <div className = "nomor" > 
                                    <input id = "rek-fadil" value = "0352958831" disabled />
                                    <CopyToClipboard text = "0352958831" >
                                    <button onClick = {this.copyHandler} ><img src = {Copy} alt = ""/>Salin</button>
                                    </CopyToClipboard>
                                    
                                </div>

                                <h1>a/n Fadil Raditya nz</h1>

                            </div>
                        </div>

                        <div className = "bank" >
                            <img className = "bank-logo" src = {BSI} alt = ""  />
                            
                            <div className = 'bank-detail' >

                                <div className = "nomor" > 
                                    <input id = "rek-fadil" value = "7111689592" disabled />
                                    <CopyToClipboard text = "7111689592" >
                                        <button onClick = {this.copyHandler} ><img src = {Copy} alt = ""/>Salin</button>
                                    </CopyToClipboard>
                                </div>

                                <h1>a/n Lisa Hanifa</h1>

                            </div>
                        </div>

                    </div>

                </section>
                
                

            </main>
        )
    }

}

export default Invite;