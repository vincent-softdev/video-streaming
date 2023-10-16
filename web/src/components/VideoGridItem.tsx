import { useEffect, useRef, useState } from 'react'
import {UtilsService} from '../utils/utils'

type TVideoGridItemProps = {
    id: string
    title: string
    channel: {
        id: string
        name: string
        profileUrl: string
    },
    views: number
    postedAt: Date
    duration: number
    thumbnailUrl: string
    videoUrl: string
}

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, { notation: "compact" })

const VideoGridItem = (props: TVideoGridItemProps) => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current == null) return

        if (isVideoPlaying) {
        videoRef.current.currentTime = 0
        videoRef.current.play()
        } else {
        videoRef.current.pause()
        }
    }, [isVideoPlaying])

    return (
        <div className="flex flex-col gap-2">
            <a href={`/watch?v=${props.id}`} className="relative aspect-video">
                <img src={props.thumbnailUrl} alt="Video" className="block w-full h-full object-cover rounded-xl" />
                <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
                    {UtilsService.formatDuration(props.duration)}
                </div>
                <video
                className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${
                    isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"
                }`}
                ref={videoRef}
                muted
                playsInline
                src={props.videoUrl}
                />
            </a>
            <div className="flex gap-2">
                <a href={`/@${props.channel.id}`} className="flex-shrink-0">
                <img className="w-12 h-12 rounded-full" src={props.channel.profileUrl} />
                </a>
                <div className="flex flex-col">
                <a href={`/watch?v=${props.id}`} className="font-bold">
                    {props.title}
                </a>
                <a href={`/@${props.channel.id}`} className="text-secondary-text text-sm">
                    {props.channel.name}
                </a>
                <div className="text-secondary-text text-sm">
                    {VIEW_FORMATTER.format(props.views)} Views • {UtilsService.formatTimeAgo(props.postedAt)}
                </div>
                </div>
            </div>
        </div>
    )
}

export default VideoGridItem