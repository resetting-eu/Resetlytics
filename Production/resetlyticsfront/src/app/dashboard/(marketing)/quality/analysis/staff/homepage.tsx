import IndicatorCard from "@/components/ui/dashboard/visuals/indicatorcard"

export default function Staff({ sme, baseline }: { sme: any, baseline: any }) {

    return (
        <IndicatorCard
            name='Staff'
            description={'It includes respondents perceptions regarding their interactions with the staff.'}
            sme={sme.organization} 
            quarters={sme.quarters} 
            dimension = {sme.quality.staff} 
            baseline = {baseline.quality.staff} 
        />
    )
       
}
