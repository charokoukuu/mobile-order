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
        enqueueSnackbar(props.message, { variant: props.variant, autoHideDuration: 2000 });
        //eslint-disable-next-line
    }, [])
    return (
        <React.Fragment>
        </React.Fragment>
    );
}

export default function IntegrationNotistack(props: IntegrationNotistackProps) {
    return (
        <SnackbarProvider maxSnack={3} onClick={props.onClick}>
            <MyApp message={props.message} variant={props.variant} />
        </SnackbarProvider>
    );
}
