import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

type LogoAndTextProps = {
    text: string
    className: string
}

const LogoAndText = (props: LogoAndTextProps) => {
    return (
        <p className={props.className}>
            <OndemandVideoIcon /> {props.text}
        </p>
    )
}

export default LogoAndText