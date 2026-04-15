export function Title({ children }: { children: React.ReactElement | string }) {
    return (
        <h1
            className="scroll-m-20 text-center text-4xl font-extrabold
            tracking-tight text-balance"
        >
            {children}
        </h1>
    );
}
