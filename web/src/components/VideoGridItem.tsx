import { useEffect, useRef, useState } from 'react'
import {UtilsService} from '../utils/utils'
import {Video} from '../type/video'

type TVideoGridItemProps = {
    video: Video
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
            <div className="relative aspect-video">
                <img src={props.video.thumbnailUrl} alt="Video" className="block w-full h-full object-cover rounded-xl" />
                <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
                    {UtilsService.formatDuration(props.video.duration)}
                </div>
                <video
                className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${
                    isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"
                }`}
                ref={videoRef}
                muted
                playsInline
                src={props.video.videoUrl}
                />
            </div>
            <div className="flex gap-2">
                <div className="flex-shrink-0">
                    <img className="w-12 h-12 rounded-full" src={props.video.channel.profileUrl} />
                </div>
                <div className="flex flex-col">
                <p className="font-bold">
                    {props.video.title}
                </p>
                <p className="text-secondary-text text-sm">
                    {props.video.channel.name}
                </p>
                <div className="text-secondary-text text-sm">
                    {VIEW_FORMATTER.format(props.video.views)} Views • {UtilsService.formatTimeAgo(new Date(props.video.postedAt))}
                </div>
                </div>
            </div>
        </div>
    )
}

export default VideoGridItem