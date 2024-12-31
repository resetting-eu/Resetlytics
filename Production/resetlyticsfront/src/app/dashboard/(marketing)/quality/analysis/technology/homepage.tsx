import IndicatorCard from "@/components/ui/dashboard/visuals/indicatorcard"

export default function Technology({ sme, baseline }: { sme: any, baseline: any }) {

    return (
        <IndicatorCard
            name='Technology for innovation'
            description={'It captures respondents evaluation concerning the use of digital resources.'}
            sme={sme.organization} 
            quarters={sme.quarters} 
            dimension = {sme.quality.technology} 
            baseline = {baseline.quality.technology} 
        />
    )
       
}
