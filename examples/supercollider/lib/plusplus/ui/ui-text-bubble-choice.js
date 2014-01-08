ig.module(
        'plusplus.ui.ui-text-bubble-choice'
    )
    .requires(
        'plusplus.core.config',
        'plusplus.ui.ui-overlay',
        'plusplus.ui.ui-text',
        'plusplus.ui.ui-text-bubble',
        'plusplus.helpers.utilsvector2',
        'plusplus.helpers.utilsdraw',
        'plusplus.helpers.utilsintersection',
        'plusplus.ui.ui-button'
    )
    .defines(function () {
        "use strict";

        var _c = ig.CONFIG;

        /**
         * UI overlay to be used for displaying text and multiple responses in a decorative bubble.
         * <span class="alert alert-info"><strong>IMPORTANT:</strong>UI text box is an {@link ig.UIOverlay}, which means it creates an {@link ig.UIText} and uses {@link ig.UIOverlay#textSettings} to control the settings!</span>
         * @class
         * @extends ig.UIOverlay
         * @memberof ig
         * @author racingcow
         * @example
         * // see the UI overlay for a basic example of using overlays with text
         */
        ig.UITextBubbleChoice = ig.global.UITextBubbleChoice = ig.UITextBubble.extend(/**@lends ig.UITextBubble.prototype */{

            /**
             * @override
             * @default
             */
            size: {x: _c.TEXT_BUBBLE_CHOICE.SIZE_X, y: _c.TEXT_BUBBLE_CHOICE.SIZE_Y},

            sizeAsPct: false,

            /**
             * @override
             * @default
             */
            choiceSize: {x: _c.TEXT_BUBBLE_CHOICE.SIZE_X, y: _c.TEXT_BUBBLE_CHOICE.CHOICE_SIZE_Y},

            /**
             * Padding between message and top choice
             * @type Number
             * @default
             */
            choiceTopPaddingY: _c.TEXT_BUBBLE_CHOICE.CHOICE_TOP_PADDING_Y,

            /**
             * Padding between each choice
             * @type Number
             * @default
             */
            choicePaddingY: _c.TEXT_BUBBLE_CHOICE.CHOICE_PADDING_Y,

            /**
             * Text to show for response choices.
             * <br>- created on init
             * <br>- requires {@link ig.UIOverlay#textSettings}
             * @type Array
             * @private
             * @default
             */
            choiceMessages: null,

            /**
             * Buttons response choices.
             * <br>- created on init
             * <br>- requires {@link ig.UIOverlay#textSettings}
             * @type Array
             * @private
             * @default
             */
            choiceButtons: null,

            /**
             * Entity that indicates the currently highlighted choice
             * <br>- created on init
             * <br>- requires {@link ig.UIOverlay#textSettings}
             * @type ig.UIBorder
             * @private
             * @default
             */
            choiceIndictor: null,

            /**
             * @override
             */
            onChoiceActivated: null,

            init: function(x, y, settings) {

                if (settings && settings.textSettings && settings.textSettings.choices && settings.textSettings.choices.length) {
                    ig.merge(settings, {
                        textSettings: {
                            linkAlignInside: true,
                            linkAlign: { x: 0, y: -1 }
                        },
                        shrinkToText: false,
                        messageMoveTo: false,
                        //padding: {x: _c.TEXT_BUBBLE.PADDING_X, y: _c.TEXT_BUBBLE_CHOICE.PADDING_Y}
                    });
                }

                this.parent(x, y, settings);
            },

            /**
             * @override
             **/
            initProperties: function () {

                this.parent();

                this.onChoiceActivated = new ig.Signal();

            },

            /**
             * @override
             **/
            resetExtras: function () {

                // create messages for choices, but don't spawn yet
                // we need choice messages for calculating size

                if (!this.choiceMessages && this.textSettings && this.textSettings.choices && this.textSettings.choices.length > 0 ) {

                    this.choiceMessages = [];
                    this.choiceButtons = [];
                    for (var i = 0, il = this.textSettings.choices.length; i < il; i++) {
                        var choiceMessage = new (ig.UIText)( 0, 0, {
                            layerName: this.layerName,
                            fixed: this.fixed,
                            alpha: this.alpha,
                            linkedTo: this,
                            linkAlignInside: true,
                            linkAlign: { x: 0, y: -1},
                            marginAsPct: false,
                            marginScaleless: false,
                            autoRefreshText: false,
                            maxWidth: this.choiceSize.x,
                            maxHeight: this.choiceSize.y,
                            text: this.textSettings.choices[i].text,
                            id: this.textSettings.choices[i].id,
                            font: this.textSettings.choiceFont || ig.Font.FONTS.CHAT
                        });
                        this.choiceMessages.push(choiceMessage);
                        var choiceButton = new (ig.UIButton)(0, 0, {
                            layerName: this.layerName,
                            fixed: this.fixed,
                            linkedTo: choiceMessage
                        });
                        choiceButton.onActivated.add(this.choiceActivated, this);
                        this.choiceButtons.push(choiceButton);
                        console.log('created choice message: ' + choiceMessage.text);
                    }

                }

                this.parent();
            },

            /**
             * @override
             */
            ready: function () {

                if ( this.choiceMessages && this.choiceMessages.length > 0 ) {

                    if (this.message) {
                        this.message.margin = { x: 0, y: this.padding.y };
                        this.message.refresh( true );
                    }

                    var scaleMod = this.message.scale / this.scale, cScaleMod;
                    for (var i = 0, il = this.choiceMessages.length; i < il; i++) {
                        var messageChoice = this.choiceMessages[i];
                        cScaleMod = messageChoice.scale / this.scale;
                        ig.game.spawnEntity( messageChoice, 0, 0, {
                            margin: { x: 0, y: this.padding.y + this.message.size.y * scaleMod + this.choiceTopPaddingY + (messageChoice.size.y * cScaleMod + this.choicePaddingY) * i }
                        });
                        var choiceButton = this.choiceButtons[i];
                        ig.game.spawnEntity( choiceButton, 0, 0, {
                            name: 'testit' + i.toString(),
                            linkedTo: messageChoice,
                            size: {x: messageChoice.maxWidth * cScaleMod, y: messageChoice.size.y * cScaleMod },
                            zIndex: messageChoice.zIndex + 1
                        });
                    }

                }

                this.parent();

            },

            cleanup: function() {
                if ( this.choiceMessages && this.choiceMessages.length > 0 ) {
                    for (var i = 0, il = this.choiceMessages.length; i < il; i++) {
                        this.choiceButtons[i].onActivated.remove(this.choiceActivated);
                        this.choiceButtons[i].kill();
                        this.choiceMessages[i].kill();
                    }
                }
                this.textSettings.choices = [];
                this.parent();
            },

            choiceActivated: function(textButton) {
                var choiceMessage = textButton.linkedTo;
                console.log('You clicked "' + choiceMessage.text + '" (' + choiceMessage.id + ')');
                this.onChoiceActivated.dispatch(choiceMessage.id);
            },

            /**
             * @override
             */
            resize: function ( force ) {

                var force = this.parent( force );

                if (this.choiceMessages && this.choiceMessages.length) {

                    // Use a fixed size in X direction, let Y direction grow as needed to show all choices

                    var choicesSizeY = 0, cScaleMod, choice;

                    for (var i = 0, il = this.choiceMessages.length; i < il; i++) {
                        choice = this.choiceMessages[i];
                        cScaleMod = choice.scale / this.scale;
                        choice.maxWidth = this.choiceSize.x * ( 1 / cScaleMod);
                        choice.resize( true );
                        choicesSizeY += (this.choicePaddingY + choice.getSizeDrawY() * cScaleMod);
                    }

                    var messageSizeY = 0, scaleMod, message;
                    if (this.message) {
                        message = this.message;
                        scaleMod = message.scale / this.scale;
                        message.maxWidth = this.choiceSize.x * ( 1 / scaleMod);
                        message.resize( true );
                        messageSizeY = message.getSizeDrawY() * scaleMod;
                    }

                    this.size.x = this.choiceSize.x + this.padding.x * 2;
                    this.size.y = messageSizeY + choicesSizeY + this.padding.y * 2 + this.triangleLength;

                    force = this.needsRebuild = true;

                }

                return force;

            }

        });

    });