import React, { useEffect } from 'react';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';


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
    return (
        <SnackbarProvider color='white' iconVariant={{
            success: <div style={{ color: "white", marginTop: "5px", marginRight: "3px" }}><img width={"20vw"} src="/svg/checkbox-marked-circle-outline.svg" alt="alert"></img> </div>,
            error: <div style={{ color: "white", marginTop: "5px", marginRight: "3px" }}><img width={"20vw"} src="/svg/alert-circle-outline.svg" alt="alert"></img> </div>,
            warning: <div style={{ color: "white", marginTop: "5px", marginRight: "3px" }}><img width={"20vw"} src="/svg/silverware.svg" alt="alert"></img> </div>,
        }}
            maxSnack={3} onClick={props.onClick}
        >
            <MyApp message={props.message} variant={props.variant} />
        </SnackbarProvider >
    );
}
