import { useEffect, useRef, useState } from "react";
import CButton from "./CButton"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type TCategoryPillProps = {
    categories: string[]
    selectedCategory: string
    onSelect: (category: string) => void
}

const TRANSLATE_AMOUNT = 200

const CategoryPills = (props: TCategoryPillProps) => {
    const [translate, setTranslate] = useState(0)
    const [leftVisible, setLeftVisible] = useState(false)
    const [rightVisible, setRightVisible] = useState(true)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(containerRef.current == null) return

        const observer = new ResizeObserver(entries => {
            const container = entries[0]?.target
            if(container == null) return
            
            setLeftVisible(translate > 0)
            setRightVisible(
                translate + container.clientWidth < container.scrollWidth
            )
        })

        observer.observe(containerRef.current)

        return () => {
            observer.disconnect()
        }
    }, [props.categories, translate])

    const LeftVisibleMethod = () => {
        setTranslate(translate => {
            const newTranslate = translate - TRANSLATE_AMOUNT
            if(newTranslate <= 0) return 0
            return newTranslate
        })
    }

    const RightVisibleMethod = () => {
        setTranslate(translate => {
            if(containerRef.current == null) return translate
        
            const newTranslate = translate + TRANSLATE_AMOUNT

            const edge = containerRef.current.scrollWidth
            const width = containerRef.current.clientWidth

            if(newTranslate + width >= edge) return edge - width

            return newTranslate
        })
    }

    return (
        <div ref={containerRef} className="overflow-x-hidden relative">
            <div className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
                style={{transform: `translateX(-${translate}px)`}}>
                {
                    props.categories.map((e) => {
                        return <CButton key={e} onClick={() => props.onSelect(e)} variant={props.selectedCategory === e ? "dark": "default"} className="py-1 px-3 rounded-lg whitespace-nowrap">{e}</CButton>
                    })
                }
            </div>
            {leftVisible && <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
                <CButton variant="ghost" size="icon" onClick={LeftVisibleMethod} className="h-full aspect-square w-auto p-1.5">
                    <ArrowBackIosNewIcon />
                </CButton>
            </div>}
            {rightVisible && <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
                <CButton onClick={RightVisibleMethod} variant="ghost" size="icon" className="h-full aspect-square w-auto p-1.5">
                    <ArrowForwardIosIcon />
                </CButton>
            </div>}
        </div>
    )
}

export default CategoryPills