/* 
    Nodejs 使用 ESModule 定义 .mjs 文件的模块,
    但是我们可以通过 NodeJs 的配置文件设置 "type": "module"
    就可以在 js 文件中使用 esModule 语法。
    NodeJs 的配置文件 package.json 可以通过 npm init -y 生成，或者自己新建
*/

const ziyue = (text) => `
                 __._                                   
                / ___)_                                 
               (_/Y ===\\                                          __ 
               |||.==. =).                                          | 
               |((| o |p|      |  ${text}
            _./| \\(  /=\\ )     |__                    
          /  |@\\ ||||||||.                             
         /    \\@\\ ||||||||\\                          
        /   \\  \\@\\ ||||||//\\                        
       (     Y  \\@\\|||| // _\\                        
       |    -\\   \\@\\ \\\\//    \\                    
       |     -\\__.-./ //\\.---.^__                        
       | \\    /  |@|__/\\_|@|  |  |                         
       \\__\\      |@||| |||@|     |                    
       <@@@|     |@||| |||@|    /                       
      / ---|     /@||| |||@|   /                                 
     |    /|    /@/ || |||@|  /|                        
     |   //|   /@/  ||_|||@| / |                        
     |  // \\ ||@|   /|=|||@| | |                       
     \\ //   \\||@|  / |/|||@| \\ |                     
     |//     ||@| /  ,/|||@|   |                        
     //      ||@|/  /|/||/@/   |                        
    //|   ,  ||//  /\\|/\\/@/  / /                      
   //\\   /   \\|/  /H\\|/H\\/  /_/                     
  // |\\_/     |__/|H\\|/H|\\_/                         
 |/  |\\        /  |H===H| |                            
     ||\\      /|  |H|||H| |                            
     ||______/ |  |H|||H| |                             
      \\_/ _/  _/  |L|||J| \\_                          
      _/  ___/   ___\\__/___ '-._                       
     /__________/===\\__/===\\---'                      
                                                        
`;

let a = 23

let b = '模块化'

const c = () => {
    return a
}

export default ziyue;
export { 
    b,
    c as getA
}
