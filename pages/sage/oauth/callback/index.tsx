import { useRouter } from "next/router";


const CallbackComponent = () => {

    const router = useRouter();

    const { code } = router.query;
   


    return (
        <div>
        <h1>{code}</h1>
        </div>
    );
}

export default CallbackComponent;