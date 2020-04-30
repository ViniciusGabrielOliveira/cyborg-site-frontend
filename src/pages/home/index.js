// https://www.youtube.com/watch?v=35mFPbNE1iU
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import api from '../../services/api'
import Carousel from '../../components/carousel';
import logoImg from '../../assets/logo.svg';
import ImgAlt from '../../assets/01.jpg';
import Biografia from '../biografia';
import Contato from '../contato';
import noticiasAlter from '../../assets/noticiasAlter.json'


import './styles.css'

export default function Home() {

    const [biografiaView, setBiografiaView] = useState(false);
    const [homeView, setHomeView] = useState(true);
    const [noticias, setNoticias] = useState(noticiasAlter);
    const [contatoView, setContatoView] = useState(false);
    

    
    useEffect(() =>{

        api.get('noticias').then(response => {
            setNoticias(response.data);
        })
        
    })

    function StyleCyborg(text) {
    const textArray = text.split("CYBORG");
    
    return (
            <span>
                {textArray.map((item, index) => (
                    <>
                        {item}
                        {index !== textArray.length - 1 && (
                            <b className="textCyborg">CYBORG</b>
                        )}
                    </>
                ))}
            </span>
        );
    }


    return(
        <div className='home-container'>
            <header className='header'>
                <img className='logo' src={logoImg} alt={'Vereador Cyborg'} />
                <div className='menu-tarja'>
                    <div className='itens-container'>
                        <Link className='menu-item' to='/' onClick={() => {setHomeView(true); setBiografiaView(false)}}>Home</Link>
                        <Link className='menu-item' to='/' onClick={() => {setHomeView(false); setBiografiaView(true)}} >Biografia</Link>
                        <Link className='menu-item' to='/contato'>Contato</Link>
                        <Link className='menu-item' to='/' onClick={() => {setHomeView(true); setBiografiaView(false); setContatoView(false)}}>Home</Link>
                        <Link className='menu-item' to='/' onClick={() => {setHomeView(false); setBiografiaView(true); setContatoView(false)}} >Biografia</Link>
                        <Link className='menu-item' to='/' onClick={() => {setHomeView(false); setBiografiaView(false); setContatoView(true)}} >Contato</Link>
                    </div>
                    <div className='icons-container'>
                        <a href='https://www.facebook.com/vereadorcyborg/'><FaFacebook size={20} color="#fff" /></a> 
                        <a href='https://www.instagram.com/rogeriocyborg/'><FaInstagram size={20} color="fff"/></a>
                        <a href="https://www.youtube.com/channel/UCkjSv03cwwdk-PgR6S1yyzA"><FaYoutube size={20} color="#fff"/></a>
                    </div>
                    
                </div>
               
            </header>
            <Carousel/>
            {homeView && <div className='cards-container'>
                 <ul>
                    {noticias.map(noticia => (
                        <li key={noticia.url}>
                            {noticia.text.length<300 ?
                                <>
                                    <div>  
                                        {noticia.image.length > 5 ? <img className='img-card' src={noticia.image} alt="...carregando imagem..." /> : <img className='img-card' src={ImgAlt} alt="...carregando imagem..." />}
                                    </div>
                                    <h1>{noticia.title}</h1>
                                    <p>{StyleCyborg(noticia.text)}</p>
                                </>
                            :
                                <>
                                    <div>  
                                        {noticia.image.length > 5 ? <img className='img-card' src={noticia.image} alt="...carregando imagem..." /> : <img className='img-card' src={ImgAlt} alt="...carregando imagem..." />}
                                    </div>
                                    <h1>{noticia.title}</h1>                            
                                    <p>{StyleCyborg(noticia.text.substr(0,200))}...
                                        <Link className='leia-mais' to='/'>Leia mais</Link>
                                    </p>
                                </>
                            }    
                        </li>
                    ))}                    
                </ul>
            </div>}
            {biografiaView && <Biografia/>}     
            {biografiaView && <Biografia/>} 
            {contatoView && <Contato/>}     
        </div>
    );
} 


// // https://www.youtube.com/watch?v=35mFPbNE1iU


// import React, { useState, useEffect } from 'react';
// import {Link} from 'react-router-dom';
// import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
// import api from '../../services/api'

// import Carousel from '../../components/carousel';
// import logoImg from '../../assets/logo.svg';
// import ImgAlt from '../../assets/01.jpg';
// import Biografia from '../biografia';
// import Contato from '../contato';


// import './styles.css'

// export default function Home() {
//     const noticiasAlter = [{
//             "url": "http://64.225.126.128/noticias/4/",
//             "title": "Bicicletas Compartilhadas",
//             "pub_date": "2020-04-26T14:28:33.276667Z",
//             "reference_date": "2020-04-26",
//             "text": "Foi através do projeto (PL 103/2018) de autoria do Vereador CYBORG que a prefeitura implantou em nossa cidade o sistema de bicicletas compartilhadas. Hoje já são mais de 250 bicicletas espalhadas pela região central. E o vereador solicita que o projeto possa ser ampliado para a cidade toda. - O projeto de lei (PL 20/2018) de autoria do Vereador CYBORG, proíbe o fornecimento de canudos plásticos em hotéis, restaurantes, lanchonetes, bares e similares. Longe de ser o principal problema quando o assunto é poluição por plásticos, o canudo funciona como uma 'porta de entrada' para discussões mais profundas e por ser um item dispensável no consumo diário, pode ter um apelo mais significativo. Os números impressionam: só nos Estados Unidos, mais de 500 milhões de canudos plásticos são utilizados diariamente. Se continuar neste ritmo haverá mais plástico do que peixes no oceano até 2050.",
//             "tags": "mobilidade urbana, meio ambiente, bicicletas, projeto de lei, lei",
//             "image": "https://lh3.googleusercontent.com/R_kcHEsor9S2Aq837KgDiS3S1Zuumn0phzM0fabPVEmMp8NIAS-Yrku51VSQ0K-vNsLs6S3qhXeDQ3h_JG4MLHku_MuxUjv7yi4yqUhvwFXqCS5DfmmP3PMaACnPvNK0IZ4N0Gkphfo-1-uW-fINfXhLLQ6_65hsfr1uv__Valnttq0d5rqrxuvESyOxSgcdMPmGEMK0fb7l-4toZJGtUhmSQKr1bXR8Le7dNXAHxsom0bmWk6PriuzqCo1wV5ghUSF44rY3O2WQ-ZMMG51ZpLl5YpdH7deKxVvqi8EVnI11aCjpQPTWpDCkQ6NipOs6_uN6zO4LNn3dJkxcA9Irzk1zFJCOYmRq06ACUO_l2MMQrd2k91x532XneJx-g5Eemqd7tX17QUTm1VUvzYYN6Q45G8vYg5pibtnrM9Ca2irG6A194GU0x5B9Bm2WtBwamLDJ-HBhKsBYj_FCYv5Rm6sQ6YIAOsOAE3w4G75nhhdLHZ2L6vofjMFT3co_WacBD2kiHB4c__yNpw6a4olfhLbray9t7LIcj5XRjlC5FjqiU3O5Sq2dTl1pFX5y7Rgqt0KDigH1D-KLdbkJuVwP_ek7skwAj2ioydWAizxApk7kii-qDSStKjyCUIFXdmmYh3NiYa7gpRgDL8AE5omPrvxKx2geyLkmcmRpYbhxPsGfOps9KQQqjcmAVAzo05Dcfe3D54moqnV-iKz6vu59hCR00oJ2i2SL-cMsYZgQ38OE8ofUzT-PeDE-=w834-h657-no",
//             "classification": 0
//         },
//         {
//             "url": "http://64.225.126.128/noticias/8/",
//             "title": "Lei de Incentivo Fiscal",
//             "pub_date": "2020-04-27T08:26:15.087413Z",
//             "reference_date": "2020-04-27",
//             "text": "Foi através do trabalho do Vereador CYBORG que a prefeitura enviou a alteração da Lei de Incentivo Fiscal para a Câmara Municipal, onde foi aprovado por unanimidade, possibilitando o aumento do incentivo para o esporte, cultura e esporte paraolímpico.",
//             "tags": "Esporte, Projeto de Lei",
//             "image": "https://lh3.googleusercontent.com/m9KT1kiEgsegw27BoPm5cwGCEYYEvIim-XYJHj8s7KSjeqruboa_jyNlTnADNhNxzrMKYEufKLPW2AZtil8zmNwqbv9Uezkew_bFF47sG-KKyU5U_-KHeWYfCpji7sMkBogzhb-nrO8Am9YdQtHRy8K772yB8qzztW_kxSW7Uxq9aWLx8fn5snebl3PNSF4hllaFsuExlBWoM7eblG6IBICQM9Hk5Jsl_MQenfNF_efnzjdTaf57tbgfHxBu75bVmJVipjGH3vChM1cjhcu2DBgUiUmaJDIojnzvmiXux63MaoC-FpxDMbPV3i4dpV6E0Z2-MKAWpvaClcx3AV4tGhtB36DtWpJiW1t4AiA8t3FqBfg6yfhwyyus2KMzk_1ccPp5rgkQlc5lS_LgS2t1ht0ENNaCTZXQCHlJDzNGOndPI06D4DSBUP1FkWLgC6Id8VJUe9FnmdPhWHWelshIsy0BS_vtNz-ZoYKdK1xHxV-k0k5XDufkJjMCT4KYuE81Re4DJI6Y0x9Ks6uOYQb0u0IMd2ZiJgXv132PeR0s7ZIktzSkTW1YIDziOZLjDVR3G4DBU4IGIX06a32h7r8mhOlaJaKaLFoh9oFKjOfXr_DFmh7GJZFzz-ZZNLFX6mY0gKzCU6YwP8sfwdS_rQD9dn19YOa0W43N0adGmq_B2_SNeHG-JSDUcx80oXP_GCJD_ZTsjxW1cDkq6mjiTQsCYi16bBXKrDdAkqTTTrAAQUfflxslxgo9q5Yn=w986-h657-no",
//             "classification": 0
//         },
//         {
//             "url": "http://64.225.126.128/noticias/5/",
//             "title": "Patinetes Elétricos",
//             "pub_date": "2020-04-26T14:42:50.147556Z",
//             "reference_date": "2020-04-26",
//             "text": "CYBORG também protocolou o projeto (PL 501/18) permitindo a circulação de patinetes elétricos, hover board e outros similares elétricos, desde que respeite  a velocidade compatível com a segurança no local.",
//             "tags": "meio ambiente, patinetes, mobilidade urbana, projeto de lei, lei",
//             "image": "https://lh3.googleusercontent.com/Gh4Rpc1lkP8t1N7Ltu-KB7UrP6IyOsozvdUqw_xpxJ51IWtWGw92WFYzZEOt1E_HRbvDmWidigIoIS8-C1vjWtSBq8xCAHTMn_8vyirjupu8LwRlC4dLCeS0P6n42a4-OweCOjeStPYjICBZFWocAvBx8PmwGxzqzfFzW0BTV23xIiI3hAPFXkmoDWVL6mIhaa-GgeAw7foEGwuSmA-MjEpVGI2_oWqbzlZyLFgD6pmVfrSX7heCZfMyqeokqUA-EMYNRgoCt-avLpzBk-ZqVNeh3Pr97dnWtmlQtg-Fq1UO9LoDPjEIFIGaxJvqMeKBaCIkev9cZTn8Rq3gTXWl12GCds9XeuNEU6We294rybNMToblfRvPBDUbGovZMJo3MSiAD06C3ecLnWXkzH0y8sJTPM6eyd0qFtr88GcdFqd4eKVSPK2RW3bBs0IWXesL8TDx2zpvXfZ_SKMOyE4LZmwaD_bd68PwM3_0IaSXY9-1IsYtYD-ew6wz6DAtXJrBksEh8dJIDbschE84ZEpQDG_sYr2cvBPf7ElABwFRo0gmtyZ5sq0k9i5462s83XZpIUY5z9Rt17oPG92UgudvzLWXXWqdp8uU7MhapIJxY0ZK2zqO3wMQVX_JJgu2xP_oGqYblg2wuLp_Cbbm6o3iK3NSZ1kEFdXjZyZonxfyhb1C6RMA3mGg0B7bECLed8OxZXDN5Jj-uqfV30_aAO3LQqg4YyzvX7sqwBXEZtn3cJ4Etc4usclaMzC8=s657-no",
//             "classification": 0
//         },
//         {
//             "url": "http://64.225.126.128/noticias/6/",
//             "title": "Feira Noturna",
//             "pub_date": "2020-04-27T08:17:58.816326Z",
//             "reference_date": "2020-04-27",
//             "text": "O Projeto (PL 9140/2014) de implantação da Feira Noturna em nossa cidade também é de autoria do Vereador CYBORG. Hoje já são duas feiras noturnas e já solicitamos ampliação para outras regiões da cidade.",
//             "tags": "Empreendedorismo, Qualidade de Vida, Projeto de Lei",
//             "image": "https://lh3.googleusercontent.com/tVDNq863nC8TpVIyKpXevqYZ2eBFfJTToKT4KfQqbrquUPMcgNMRlgwCxDaVWRR856Fv3jcZbSuH279xJIOpXFjA1Ca55JvNyS_npI47D1E3oXpHHICYKtP5i93T1wgJgZ6J0V_ADwvzTRpFv5W6PbkqYuubZLcafai1Z7liruIqHQzIokCouS1efHEazmCOcmpkOdgGDtrsUIauKZOf_e9TogPEC0LxDIkNu2zLORq1mtEttOqcf22vICxeY4fxtBNp2s3yztVDdBKRXt3XOcsy6VZ2MxWg2r-cptpvIY5MqbO2OHo0Bi-_KTu12BAqLaF4-fvjdLE2UWYEp_E0K5kMhQlUMsmAlURaXrUetHGH4tWFwncKbG0tuqSKSK2dbJzif-8IBHokiIy8thS1ODKA-fv097yvDW83A9dJgP4gJd4tCPCMH4NvB12Lv1elVkwPVUUS3aSrGvVnW6dL6eBDgr8WYQsXXB-JUDYy2kP2GGn-iQiIGYAUBkB2KirzwReRk4XPGWozcpTv4V0k0DFiaGyRW0gyU_dZmciZVC-xXmXlZermEmPNeyf2TDjJVEUlhWE2CMU7ogt-HKeuAbXAKSAvdD3ieqHc4KxUROKTDjfIZ-8jisnFORDUhM0ioV2IjYTy-ownaPhIpWfeSSNwONRFPQk0whjUmcW6uFUVqPIACoXJpVBm9yBj6HnTv5GOjKF1BpmBzvIw3a8rV3ca8i3Ripd8WRgBJJUJeVAuHi7zlNaCTnd9=w875-h657-no",
//             "classification": 1
//         },
//         {
//             "url": "http://64.225.126.128/noticias/7/",
//             "title": "PEV Urbanova",
//             "pub_date": "2020-04-27T08:21:26.717355Z",
//             "reference_date": "2020-04-27",
//             "text": "O Vereador CYBORG vem trabalhando desde seu primeiro mandato solicitando à Prefeitura a instalação de um PEV (Ponto de Entrega Voluntária) na região do Urbanova.",
//             "tags": "Meio Ambiente, Reciclagem, Fiscalização",
//             "image": "https://lh3.googleusercontent.com/Gwp3PjNFOPiBGfk0_C-gSfkl-sx-AamqkGYzIzsllAQrdwu7jAzkINB3lZAfPAOgybCVeVdMnQmLBzDCa5qUS203_9zphj0hMEbcfdsLKmTEVZ5YGLeLU3JGQSB9w1wYsOFyWAqpGfH6FPxcWUQsbuw7qar80LydSpuCRgZ5iTiKOjFXTDExuR6P0S-QmCt_WAvAhPZwOyS8OG7pMj38ivStgZ8ZydDd-IXEXnC9cStO3RlFOoH0nLUNIJ7W-DzpcqDGYP4H-gs-SMStrFzQRN-zgm3YPwszhHVZwKukXtJih6NK9Bm2pb8B4JmB-fcH1CLSW9ucAO7IjA96HNatNQ_fbZubTKjl4mdaLif5lGcfUqSdN4umqdvo6n607DZpVFq5qf-aep4qM5juDoj2lKRpP170O7pXJmz4vH8x2yikVDJZ0Lj865M9Rc3vZ2k59Sh2N2brZEWev37XiKeQBTiTVCAqrDQhhah05MbKJ31bPzen6AeFWhL1-NcagxHz3oO51xgzZqxNrPYihuHZ44MSQouzr4vP11lWEhMU_2CavVloWxs4efZPygXJ4zzGK2Gxt-b6osacUk64u8vltqSRwySWcBmNrkkNJPhZ7wM6a0VCujyjXn1PfFEUOo4WQD0MUKB2Ie4B8Ssm8IEOhwzvf6CaXUkFUOfca27gqAak2U4zIpzCqbidEVk4nFETZcyonP3NmG60Lg3a-wjfNM6ViILEe3hNwdr1wWmfkNLt3otCGdbsQOKe=w842-h599-no",
//             "classification": 0
//         },
//         {
//             "url": "http://64.225.126.128/noticias/9/",
//             "title": "Proibição de Canudos",
//             "pub_date": "2020-04-27T08:38:49.918697Z",
//             "reference_date": "2020-04-27",
//             "text": "O projeto de lei (PL 20/2018) de autoria do Vereador CYBORG, proíbe o fornecimento de canudos plásticos em hotéis, restaurantes, lanchonetes, bares e similares. Longe de ser o principal problema quando o assunto é poluição por plásticos, o canudo funciona como uma 'porta de entrada' para discussões mais profundas e por ser um item dispensável no consumo diário, pode ter um apelo mais significativo. Os números impressionam: só nos Estados Unidos, mais de 500 milhões de canudos plásticos são utilizados diariamente. Se continuar neste ritmo haverá mais plástico do que peixes no oceano até 2050.",
//             "tags": "Meio Ambiente, Projeto de Lei",
//             "image": "https://lh3.googleusercontent.com/foankH3XWwrnmtv3zWOa1wktSKybOcxJ7JZBZpXJx5iuXqOAz_LWFn89FGNzawXxPHnDujhjimLuTUrRWW0pzTPFLRIlZ2eY_nOVbR6eSVwQis3ppNfYuCoU51I-yHgHMC9unIEqpwHC6Ms8U-MQRzDE9tPEgLLumrqF-jDYojRXDNBrxfZswfYRMyCU2Gc8Kqko9q0t4ldKhIZOWDmEie9WTFYoCfHmMedoKaYZOAS3dvBEXYc4SknvP0TNjSBZ17WrpW-Vf3-jLjxSYmsWOjtgqL-B9MVSmO86VawYoyc6LzrV3o8DmnD7c1OqwzimY5afDRRHNWStaVbPgegWQpVIdrW6_xbaaPTpoQ8XBSEYQYEnb4tBknIXKtXrYdi8RcU1J8VtYlsy2IVFNYPiaSTndPWk78Rxx1mpr4znFoJqqaND2TeO94aZRXRE3v_W3O8VLfwm5LXdvoTIVAL6rVCciIka-Oy95v5oIWMtZuBrh4n7_8ZwvkqMf3O5H5jrCbjeDBVnrlcT9v5Z0d3N1P9oKhBLXs1_sTeYHuswnbV6KYijYHG4wUDoczsB16aYkDXjZ5p_3VIADJTTXqJPx829qxg2SzMLqiTMy0SbAhbXovuh8fpJJhndulwyjjPo3ou7cxA0Q_hLRS8kplYh4Sdvve96j82aBikJQFeRs55nSgq_cjPP1YybCvWw6kSDB6CfgkcAtu58NisCY2zRoUiqxiy0q7aREh4MiQwDo-xQpJWGULem2vXT=w1076-h657-no",
//             "classification": 0
//         }]

//     const [biografiaView, setBiografiaView] = useState(false);
//     const [homeView, setHomeView] = useState(true);
//     const [noticias, setNoticias] = useState();
//     const [contatoView, setContatoView] = useState(false);
    
//     function useEffect() {

//         api.get('noticias').then(response => {
//                 setNoticias(response.data);
//             });
        
//     }




//     return(
//         <div className='home-container'>
//             <header className='header'>
//                 <img className='logo' src={logoImg} alt={'Vereador Cyborg'} />
//                 <div className='menu-tarja'>
//                     <div className='itens-container'>
//                         <Link className='menu-item' to='/' onClick={() => {setHomeView(true); setBiografiaView(false); setContatoView(false)}}>Home</Link>
//                         <Link className='menu-item' to='/' onClick={() => {setHomeView(false); setBiografiaView(true); setContatoView(false)}} >Biografia</Link>
//                         <Link className='menu-item' to='/' onClick={() => {setHomeView(false); setBiografiaView(false); setContatoView(true)}} >Contato</Link>
//                     </div>
//                     <div className='icons-container'>
//                         <a href='https://www.facebook.com/vereadorcyborg/'><FaFacebook size={20} color="#fff" /></a> 
//                         <a href='https://www.instagram.com/rogeriocyborg/'><FaInstagram size={20} color="fff"/></a>
//                         <a href="https://www.youtube.com/channel/UCkjSv03cwwdk-PgR6S1yyzA"><FaYoutube size={20} color="#fff"/></a>
//                     </div>
                    
//                 </div>
               
//             </header>
//             <Carousel/>
//             {homeView && <div className='cards-container'>
//                 <ul>
//                     {noticias.map(noticia => (

//                         noticia.text.length<300 ?

//                             <li key={noticia.url}>
//                                 <div>  
//                                     {noticia.image.length > 5 ? <img className='img-card' src={noticia.image} alt="...carregando imagem..." /> : <img className='img-card' src={ImgAlt} alt="...carregando imagem..." />}
//                                 </div>
//                                 <h1>{noticia.title}</h1>
//                                 <p>{StyleCyborg(noticia.text)}</p>
//                             </li> 
//                             :
//                             <li key={noticia.url}>
//                                 <div>  
//                                     {noticia.image.length > 5 ? <img className='img-card' src={noticia.image} alt="...carregando imagem..." /> : <img className='img-card' src={ImgAlt} alt="...carregando imagem..." />}
//                                 </div>
//                                 <h1>{noticia.title}</h1>                            
//                                 <p>{StyleCyborg(noticia.text.substr(0,200))}...
//                                     <Link className='leia-mais' to='/'>Leia mais</Link>
//                                 </p>
//                             </li>
//                     ))}
                    
//                 </ul>
//             </div>}
//             {biografiaView && <Biografia/>} 
//             {contatoView && <Contato/>}     
//         </div>
//     );

    
// }