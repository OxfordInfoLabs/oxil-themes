/**
 * Net slider, slides a container with dynamic buttons.
 */
import Configuration from "kiniauth/ts/configuration";

export default class NetSlider extends HTMLElement {

    private scrollStep: number;
    private container: HTMLElement;

    constructor() {
        super();

        this.scrollStep = this.getAttribute("scroll-step") ? Number(this.getAttribute("scroll-step")) : 200;

        if (this.getAttribute("container")) {
            this.container = this.querySelector(this.getAttribute("container"));
            this.init();
        }


    }




    // Loaded function
    private init() {

        const moreButton = this.getElementsByClassName("carousel-more-button").item(0);
        const leftButton = this.getElementsByClassName("carousel-left-button").item(0);


        moreButton.addEventListener("click", () => {

            const newScroll = this.container.scrollLeft + this.scrollStep;

            // Set the scroll left
            this.container.scrollLeft = newScroll;

            // Update button states based on new scroll value.
            this.setButtonStates(newScroll);

        });


        leftButton.addEventListener("click", () => {


            const newScroll = this.container.scrollLeft - this.scrollStep;

            // Set the scroll left
            this.container.scrollLeft = newScroll;

            // Update button states based on new scroll value.
            this.setButtonStates(newScroll);

        });

        this.setButtonStates(0);


        window.addEventListener("resize", () => {
            this.setButtonStates(this.container.scrollLeft);
        });

        this.addEventListener("sourceLoaded", () => {

            setTimeout(() => {
                this.setButtonStates(0);
            }, 200);

        });



    }

    // Set button states based upon scroll params.
    private setButtonStates(newScroll) {


        var containerWidth = this.container.clientWidth;


        var containerItemsWidth = 0;

        const containerItems = this.container.children;

        for (var i = 0; i < containerItems.length; i++) {
            containerItemsWidth += containerItems[i].clientWidth;
        }

        var maxScroll = containerItemsWidth - newScroll - containerWidth;


        const moreButton = this.getElementsByClassName("carousel-more-button").item(0);
        const leftButton = this.getElementsByClassName("carousel-left-button").item(0);


        if (Math.round(maxScroll) <= 0) {
            Configuration.elementVisibilityFunction(<HTMLElement>moreButton, false);
        } else {
            Configuration.elementVisibilityFunction(<HTMLElement>moreButton, true);
        }

        if (newScroll > 0) {
            Configuration.elementVisibilityFunction(<HTMLElement>leftButton, true);
        } else {
            Configuration.elementVisibilityFunction(<HTMLElement>leftButton, false);
        }


    }


}
