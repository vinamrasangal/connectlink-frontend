import React, { useEffect, useState } from 'react';
import styles from '../styles/ProfileCreation.module.scss';

const AddHistory = ({setData,name,historyFor,hide}) => {

    const [addHistory,setAddHistory] = useState({
        FirstInput:'',
        secondInput:'',
        startDate:'',
        endDate:'',
        currently:false,
    })

    const [isDisabled,setIsDisabled] = useState(true);

    function handleAdd(e){
        e.preventDefault();
        if(!isDisabled){
            setData(prev => ({...prev,[name]:[...prev[name],addHistory]}));
            hide(null)
        }
    }
    
    function handleCancel(e){
        e.preventDefault();
        hide(null)
    }

    function handleChangeHistory(e){
        const name = e.target.name
        const value = e.target.value
        if(name === 'currently'){
            setAddHistory(prev => ({...prev,currently:!prev.currently}));
        }else {
            setAddHistory(prev => ({...prev,[name]:value}));
        }
    }


    useEffect(()=>{
        if(addHistory.FirstInput === '' || addHistory.secondInput === '' || addHistory.startDate === ''){
            setIsDisabled(true)
        }else {
            if(addHistory.currently === true){
                setIsDisabled(false)
            }else if(addHistory.endDate === '') {
                setIsDisabled(true)
            }else {
                setIsDisabled(false)
            }
        }
    },[addHistory.FirstInput,addHistory.secondInput,addHistory.startDate,addHistory.endDate,addHistory.currently])
    return (
        <article className={styles.addHistory}>
            <input 
                type="text" 
                placeholder={historyFor.org} 
                className={`${styles.formInput}  light`}
                name='FirstInput'
                value={addHistory.FirstInput}
                onChange={(e)=>handleChangeHistory(e)}
                />
            <input 
                type="text" 
                placeholder={historyFor.asA} 
                className={`${styles.formInput}  light`}
                name='secondInput'
                value={addHistory.secondInput}
                onChange={(e)=>handleChangeHistory(e)}
                />
            <label htmlFor='startDate'>start date</label>
            <input 
                type='date' 
                placeholder='start date' 
                className={`${styles.formInput}  light`}
                name='startDate'
                id='startDate'
                value={addHistory.startDate}
                onChange={(e)=>handleChangeHistory(e)}
                />
                {! addHistory.currently ?
                <>  
                    <label htmlFor='endDate'>end date</label>
                    <input 
                        type="date" 
                        placeholder='end date' 
                        className={`${styles.formInput}  light`}
                        name='endDate'
                        id='endDate'
                        value={addHistory.endDate}
                        onChange={(e)=>handleChangeHistory(e)}
                        />
                </>
                :
                    ''
                }
                {historyFor.currently?
                    <div className={styles.checkbox}>
                        <input 
                            type="checkbox" 
                            id='checkbox'
                            name='currently'
                            onChange={(e)=>handleChangeHistory(e)}
                            />
                        <label htmlFor="checkbox">{historyFor.currently} </label>
                    </div>
                :
                    ''
                }
            <div className={styles.btns}>
                <button className={`${styles.btn} S-BTN`} onClick={(e)=>handleCancel(e)}>cancel</button>
                <button className={`${styles.btn} P-BTN ${isDisabled ?'disabled' : ''}`} onClick={(e)=>handleAdd(e)}>add</button>
            </div>
        </article>
    )
}

export default AddHistory