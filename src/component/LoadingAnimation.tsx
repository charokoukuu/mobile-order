import { Jelly } from "@uiball/loaders"

export const LoadingAnimation = () => {
    return (
        <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
            <div style={{ position: "absolute", top: "35%", right: "50%", transform: "translate(50%,50%)" }}> <Jelly
                size={100}
                speed={0.8}
                color="#006C9B"
            /></div>
        </div>
    )
}