import { Jelly, Orbit } from "@uiball/loaders"

interface LoadingAnimationProps {
    type: "jelly" | "orbit";
}
export const LoadingAnimation = (props: LoadingAnimationProps) => {
    return (
        <>
            {props.type === "jelly" && <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
                <div style={{ position: "absolute", top: "35%", right: "50%", transform: "translate(50%,50%)" }}>
                    {props.type === "jelly" && <Jelly
                        size={100}
                        speed={0.8}
                        color="#006C9B"
                    />}

                </div>
            </div>}
            {props.type === "orbit" && <div style={{ position: "relative", width: "100%", height: "12vw" }}>
                <div style={{ position: "absolute", top: "35%", right: "50%", transform: "translate(50%,-50%)" }}>
                    <Orbit
                        size={60}
                        speed={1.2}
                        color="#006C9B"
                    />

                </div>
            </div>}
        </>
    )
}