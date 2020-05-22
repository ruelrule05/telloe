export default{
    props: {
	    value: {
	      type: Boolean,
	      default: false
	    },
	},
	data: () => ({
	  	width: 100,
        state: false,
        pressed: 0,
        position: 0
	}),

	mounted() {
        this.toggle(this.value)
    },
    computed: {
        style() {
          return {
            transform: `translateX(${this.pos_percentage})`
          }
        },
        pos_percentage() {
          return `${this.position / this.width * 100}%`
        },
        state_class() {
          if (this.state) {
            return 'active'
          }
        }
    },
    watch: {
        position() {
          this.state = this.position >= 50
        }
    },
    methods: {
        onClick() {
          this.toggle(!this.state)
          this.emit()
        },
        toggle(state) {
          this.state = state
          this.position = !state
            ? 0
            : 100
        },
        dragging(e) {
          const pos = e.clientX - this.$el.offsetLeft 
          const percent = pos / this.width * 100
          this.position = percent <= 0
            ? 0
            : percent >= 100
              ? 100
              : percent
        },
        dragStart(e) {
          this.startTimer()
          window.addEventListener('mousemove', this.dragging)
          window.addEventListener('mouseup', this.dragStop)
        },
        dragStop() {
          window.removeEventListener('mousemove', this.dragging)
          window.removeEventListener('mouseup', this.dragStop)
          this.resolvePosition()
          clearInterval(this.$options.interval)
          if (this.pressed < 30) {
            this.toggle(!this.state)
          }
          this.pressed = 0
          this.emit()
        },
        startTimer() {
          this.$options.interval = setInterval(() => {
            this.pressed++
          }, 1)
        },
        resolvePosition() {
          this.position = this.state
            ? 100
            : 0
        },
        emit() {
          this.$emit('input', this.state)
        }
    }
}