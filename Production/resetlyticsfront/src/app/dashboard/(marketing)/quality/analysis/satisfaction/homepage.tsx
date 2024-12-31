import IndicatorCard from "@/components/ui/dashboard/visuals/indicatorcard"

export default function Satisfaction({ sme, baseline }: { sme: any, baseline: any }) {

    return (
        <IndicatorCard
            name='Satisfaction'
            description={'It evaluates respondents experience with your company, based on the analysis of their written commentaries.'}
            sme={sme.organization} 
            quarters={sme.quarters} 
            dimension = {sme.quality.satisfaction} 
            baseline = {baseline.quality.satisfaction} 
        />
    )
       
}
