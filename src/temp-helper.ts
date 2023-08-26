export const setScrolledValue = () => {
    const htmlElement = document.documentElement
    const amountOfScreenHeightScrolled = htmlElement.scrollTop / htmlElement.clientHeight

    const scrollValue = Math.min(amountOfScreenHeightScrolled, 1)

    
    htmlElement.style.setProperty("--old", ((Math.max(scrollValue, .25) - .25)  /.75).toFixed(2))
    htmlElement.style.setProperty("--scroll", getScrollValue({ percentageOfScrollToTriggerTranslate: .25, unit: "%"}))
    htmlElement.style.setProperty("--firstImage", getScrollValue({ percentageOfScrollToTriggerTranslate: .25, unit: "%"}))
} 

const getScrollValue = ({ percentageOfScrollToTriggerTranslate, unit } : {percentageOfScrollToTriggerTranslate : number, unit: string }) => {
    const htmlElement = document.documentElement
    const amountOfScreenHeightScrolled = htmlElement.scrollTop / htmlElement.clientHeight

    const regularPageScrollValue = Math.min(amountOfScreenHeightScrolled, 1)
    const translateRange = 1 - percentageOfScrollToTriggerTranslate
    const pageScroll =  Math.max(regularPageScrollValue, percentageOfScrollToTriggerTranslate)
    const speededUpScroll = (pageScroll - percentageOfScrollToTriggerTranslate) / translateRange

    return (100 * speededUpScroll).toFixed(2)+ unit
}