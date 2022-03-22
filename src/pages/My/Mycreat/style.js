import styled from 'styled-components'
export const Warpper = styled.div`

z-index: 1;
.list{
    /* margin-bottom: 30px; */
    .card{
    
    display: flex;
    flex-direction: column;
    .adm-card-header-title{
        width: 100%;
    }
    .info{
        display: flex;
        align-items: flex-end;
        position: relative;
        .name{
            padding-left: 10px;
        }
        .title{
            margin-left:20px;
        }
        .date{
            position: absolute;
            right: 0;
            top: 0;
        }
    }
    .adm-card-body{
        width: 100%;
       
        .option{
        width: 100%;
        display: flex;
        justify-content: end;
        .Heart{
            width: 2em;
            height:2em
        }
        .initlike{
            color: #ff0000;
        }
        .Edit{
            width: 2em;
            height:2em
        }
      
    }

    }
   
}
}

`