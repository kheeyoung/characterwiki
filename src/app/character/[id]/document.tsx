
import { getEtc, getPersonality } from "@/service/profileService";

import Loading from "./loading";
import './profile.css';
import ToggleSection from "../../components/toggle";
import HtmlContent from '../../components/HtmlContent'; 





interface PageProps {
    params: string;
    isPublic: boolean;
    num : string;
}

export async function Personality({ params, isPublic, num }: PageProps) {
    const id = await params;
    const isP= await isPublic;
    const n = await num;
    
    const pl = await getPersonality(id, isP);

    if (!pl) {
        return <div><Loading /></div>;
    }

    
    return (

        <div className="container">
            <div className="box">
                <ToggleSection title="성격" num={n} key="1">


                    {pl.map((pd, index) => (
                        console.log(pd.keyWord),
                        <ToggleSection title={pd.title} num={"1." + index} key={"1." + index}>
                            <div id="content" className="toggle-content">
                                    <HtmlContent htmlString={pd.content} />
                            </div>
                        </ToggleSection>

                    ))}
                </ToggleSection>


            </div>
        </div>



    );
}

export async function Etc({ params, isPublic, num }: PageProps) {
    const id = await params;
    const isP= await isPublic;
    const n = await num;
    const pl = await getEtc(id, isP);

    if (!pl) {
        return <div><Loading /></div>;
    }


    return (

        <div className="container">
            <div className="box">
            <a href="#s-2"></a>
            
                <ToggleSection title="기타사항" num="2" key="2">
                {pl.map((pd, index) => (
                        console.log(pd.keyWord),
                        <ToggleSection title={pd.title} num={"2." + index} key={"2." + index}>
                            <div id="content" className="toggle-content">
                                    <HtmlContent htmlString={pd.content} />
                            </div>
                        </ToggleSection>

                    ))}
                </ToggleSection>


            </div>
        </div>



    );
}
