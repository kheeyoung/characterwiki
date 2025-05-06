
import { getEtc, getPersonality } from "@/service/profileService";

import Loading from "./loading";
import './profile.css';
import ToggleSection from "../../components/toggle";
import HtmlContent from '../../components/HtmlContent'; 





interface PageProps {
    params: string;
    num: string;
}

export async function Personality({ params, num }: PageProps) {
    const id = await params;
    const n= await num;
    
    const pl = await getPersonality(id, n);

    if (!pl) {
        return <div><Loading /></div>;
    }

    
    return (

        <div className="container">
            <div className="box">
                <ToggleSection title="성격" num={n} key="1">


                    {pl.map((pd, index) => (
                        console.log(pd.keyWord),
                        <ToggleSection title={pd.keyWord} num={"1." + index} key={"1." + index}>
                            <div id="content" className="toggle-content">
                                <blockquote className="textBox">
                                    <div>
                                        <strong data-v-68242208="">{pd.oneWord}</strong>
                                    </div>
                                </blockquote>

                            
                                    <HtmlContent htmlString={pd.content} />
                            </div>
                        </ToggleSection>

                    ))}
                </ToggleSection>


            </div>
        </div>



    );
}

export async function Etc({ params }: PageProps) {
    const id = await params;

    const pl = await getEtc(id, 2);

    if (!pl) {
        return <div><Loading /></div>;
    }

    var n = 1;
    return (

        <div className="container">
            <div className="box">
            <a href="#s-2"></a>
                <ToggleSection title="기타사항" num="2" key="2">
                    {pl.map(([title, content], index) => (
                        <ToggleSection title={title} num={"2." + index} key={"2." + index}>
                            <div id="content" className="toggle-content">
                                <HtmlContent htmlString={content} />
                                
                            </div>
                        </ToggleSection>

                    ))}
                </ToggleSection>


            </div>
        </div>



    );
}
