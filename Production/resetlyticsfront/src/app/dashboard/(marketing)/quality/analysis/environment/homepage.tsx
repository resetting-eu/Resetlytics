import IndicatorCard from "@/components/ui/dashboard/visuals/indicatorcard"

export default function Environment({ sme, baseline }: { sme: any, baseline: any }) {

    return (
        <IndicatorCard
            name='Environment concern'
            description={'It captures how respondents perceive your activities regarding the environment.'}
            sme={sme.organization} 
            quarters={sme.quarters} 
            dimension = {sme.quality.environment} 
            baseline = {baseline.quality.environment} 
        />
    )
}
