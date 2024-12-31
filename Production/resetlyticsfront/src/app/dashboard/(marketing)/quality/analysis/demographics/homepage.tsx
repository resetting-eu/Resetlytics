import IndicatorCard from "@/components/ui/dashboard/visuals/indicatorcard"

export default function Demographics({ sme, baseline }: { sme: any, baseline: any }) {

    return (
        <IndicatorCard
            name='Demographics'
            description={'It captures the profile of respondents.'}
            sme={sme.organization} 
            quarters={sme.quarters} 
            dimension = {sme.quality.demographics} 
            baseline = {baseline.quality.demographics} 
        />
    )
       
}
