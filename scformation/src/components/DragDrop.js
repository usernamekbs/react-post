
import soccerField  from '../img/Soccer_Field_Transparant.png';
import update from 'immutability-helper'
import { useCallback,useState } from 'react'
import { useDrop } from 'react-dnd'
import { Box } from './Box.js'
// import { ItemTypes } from './ItemTypes.js'

const styles = {
  width: 397,
  height: 600,
  border: '1px solid black',
  position: 'relative',
  backgroundImage: `url(${soccerField})`,
  marginLeft : 200
} 
export const DragDrop = ({ hideSourceOnDrag }) => {
  const [boxes, setBoxes] = useState({
    a: { top: 0, left: 0, title: '' },
    b: { top: 0, left: 0, title: '' },
    c: { top: 0, left: 0, title: '' }
    
  }) 
  const moveBox = useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        }),
      )
    },
    [boxes, setBoxes],
    console.log(boxes) 
  )
  
  const [, drop] = useDrop(
    () => ({
      accept: "image",
      drop(item, monitor) {
       
        const delta = monitor.getDifferenceFromInitialOffset()
        const left = Math.round(item.left + delta.x)
        const top = Math.round(item.top + delta.y)
        moveBox(item.id, left, top)
        return undefined
      }, 
    }),
    [moveBox],
  )
  return (
    <div ref={drop} style={styles}>
      {Object.keys(boxes).map((key) => {
        const { left, top, title } = boxes[key]
        return (
          <Box
            key={key}
            id={key}
            left={left}
            top={top}
            hideSourceOnDrag={hideSourceOnDrag}
          >
            {title}
          </Box>
        )
      })}
    </div>
  )
}

export default DragDrop;
