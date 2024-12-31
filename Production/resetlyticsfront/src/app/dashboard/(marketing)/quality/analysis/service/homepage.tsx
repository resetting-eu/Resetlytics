import IndicatorCard from "@/components/ui/dashboard/visuals/indicatorcard"

export default function Service({ sme, baseline }: { sme: any, baseline: any }) {

    return (
        <IndicatorCard
            name='Service characteristics'
            description={'It captures respondents perceptions regarding how pleasant was the service, the quality and comfort of its equipments, the attractiveness of the décor and overall cleanliness.'}
            sme={sme.organization} 
            quarters={sme.quarters} 
            dimension = {sme.quality.service} 
            baseline = {baseline.quality.service} 
        />
    )
       
}
