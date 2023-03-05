import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'
import React, { useState } from 'react'
import uniform  from '../img/uniform.png';

const style = {
    position: 'absolute',
    border: '1px solid transparent',
    padding: '0.0.5rem 0.2rem',
    cursor: 'grab',
    marginTop : 45,
    textAlign: 'center',
    fontSize : 2,
    height : 40, 
    width: 50,
    marginLeft:-63,
    // borderRadius : 50
}

const style2 = {
  position: 'absolute',
  border: '1px solid transparent',
  backgroundColor: 'transparent',
  padding: '0.0.5rem 0.2rem',
  cursor: 'grab',
  marginTop : 85,
  textAlign: 'center',
  fontSize : 2,
  height : 15, 
  width: 80,
  marginLeft:-77.5,
  // borderRadius : 50
}

export const Box = ({ boxes,id, left, top, hideSourceOnDrag, children }) => {
    const [player, setPlayer] = useState("");
    const [number, setNumber] = useState("");
    console.log(player)
    const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "image",
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top],
  )

  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />
  }

  const onChange = (e) => {
    if (e.target.value.length <= 8) {
      setPlayer(e.target.value)
    }else{
      alert("8자까지 입력이 가능합니다.")
    }
      setNumber(e.target.value)
  }
  console.log(left+":::"+top);

  return (
    <>
    <div>
        <img ref={drag} 
            src={uniform}
            style={{ ...style, left, top }}
        > 
            {/* {children} */}
              
        </img> 
        <input name="player" placeholder='입력 해주세요' onChange={onChange} value={player} style={{ ...style2, left, top }} contenteditable="true">
        </input>   
    </div>
    </>
  )
}
