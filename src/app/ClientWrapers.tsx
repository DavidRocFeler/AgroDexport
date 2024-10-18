import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function ClientWrapers({children}: {children: React.ReactNode}) {
    const segment = useSelectedLayoutSegment();
    const shouldRenderComponent = segment !== "dashboard";
    return(
        <>
            {children}
            {shouldRenderComponent && <Link href="/"/>}
        </>
    )
}