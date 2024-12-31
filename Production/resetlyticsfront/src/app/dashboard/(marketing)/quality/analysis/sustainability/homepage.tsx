import IndicatorCard from "@/components/ui/dashboard/visuals/indicatorcard"

export default function Sustainability({ sme, baseline }: { sme: any, baseline: any }) {

    return (
        <IndicatorCard
            name='Social and economic sustainability'
            description={'It captures respondents awareness towards your company current practices concerning the use of local resources.'}
            sme={sme.organization} 
            quarters={sme.quarters} 
            dimension = {sme.quality.sustainability} 
            baseline = {baseline.quality.sustainability} 
        />
    )
       
}
