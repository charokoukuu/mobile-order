import React, { useEffect } from 'react';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import { CheckBox } from './icons/CheckBox';
import { SilverWare } from './icons/SilverWare';


interface IntegrationNotistackProps {
    message: string;
    variant: VariantType;
    onClick?: () => void;
}
function MyApp(props: IntegrationNotistackProps) {
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        enqueueSnackbar(<div className='japanese_R' style={{
            margin: "auto 0",
            color: 'white',
        }}>{props.message}</div>, { variant: props.variant, autoHideDuration: 2000 });
        //eslint-disable-next-line
    }, [])
    return (
        <React.Fragment>
        </React.Fragment>
    );
}

export default function IntegrationNotistack(props: IntegrationNotistackProps) {
    const iconStyles = { color: "white", marginTop: "5px", marginRight: "3px", width: "20px" };
    return (
        <SnackbarProvider color='white' iconVariant={{
            success: <CheckBox style={iconStyles} />,
            error: <div style={{ color: "white", marginTop: "5px", marginRight: "3px" }}><img width={"20vw"} src="/svg/alert-circle-outline.svg" alt="alert"></img> </div>,
            warning: <SilverWare style={iconStyles} />,
        }}
            maxSnack={3} onClick={props.onClick}
        >
            <MyApp message={props.message} variant={props.variant} />
        </SnackbarProvider >
    );
}
