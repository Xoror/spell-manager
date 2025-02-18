import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { StyleSheet, TouchableOpacity, Pressable } from 'react-native'


import ThemedView from '../basic/ThemedView'

const styles = StyleSheet.create({
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    content: {
        //marginTop: 6,
        //marginLeft: 24,
    },
    overflowHidden: {
        overflow: 'hidden',
    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
})

const Collapsible = ({ title, data, renderTitle, renderList ,isOpen, setIsOpen, forceOpen=false, index }: any) => {
    const [isOpenInternal, setIsOpenInternal] = useState(false)
    const [dataLength, setDataLength] = useState(data.len)
    const containerRef = useRef()
    
    if(isOpen && isOpen.has(index) != isOpenInternal) {
        setIsOpenInternal(isOpen.has(index))
    }
    
    
    const handlePress = () => {        
        if(isOpen) {
            setIsOpen((prev:any) => {
                if(prev.has(index)) prev.delete(index)
                else prev.add(index)
                return prev
            })
        }
        setIsOpenInternal((value:any) => !value)
    }
        
    return (
        <>
            <TouchableOpacity
                onPress={handlePress}
                activeOpacity={0.8}                
            >
                {renderTitle({title, data, isVisible: isOpenInternal})}
            </TouchableOpacity>
            {(isOpenInternal) ? 
                <ThemedView style={styles.content}>
                    {data.map( spell =>  {
                        //console.log(spell.index)
                        return renderList({title, spell})
                    })}
                </ThemedView> : null
            }
        </>
    )
}
export default Collapsible
/*
<TouchableOpacity
    onPress={handlePress}
    activeOpacity={0.8}                
>
    {renderTitle({title, data, isVisible: isOpenInternal})}
</TouchableOpacity>
{(isOpenInternal) ? 
    <ThemedView style={styles.content}>
        {data.map( spell =>  {
            //console.log(spell.index)
            return renderList({title, spell})
        })}
    </ThemedView> : null
}
*/
/*
<Animated.View
    ref={containerRef}
    style={[animatedStyles, styles.overflowHidden]}
    pointerEvents={isOpenInternal ? 'auto' : 'none'}
>
    <Animated.View  style={styles.container}>
        {data.map( (spell) =>  {
            return renderList({title, spell})
        })}
    </Animated.View>
</Animated.View>
*/

/*
{isOpenInternal && 
    <ThemedView style={styles.content}>
        {data.map( spell =>  {
            //console.log(spell.index)
            return renderList({title, spell})
        })}
    </ThemedView>
}
*/
