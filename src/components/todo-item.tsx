import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import { Item } from '../types/vue-ts-todo-item';

@Component({
    name: 'TodoItem'
})
export default class ToDoItem extends Vue {
    @Prop(Object) public item!: Item;
    @Prop(Number) public index!: number;
    @Prop(Number) public edittingIndex!: number;
    @Prop(Number) public length!: number;


    public edittingContent = '';

    @Watch("edittingIndex")
    public edittingChange(index: number) {

        if (index === this.index) {
            this.edittingContent = this.item.text;
        } else {
            this.edittingContent = '';
        }
    }

    @Emit()
    public edit(): number {
        return this.index;
    }

    @Emit()
    public cancel() {
        return
    }

    @Emit()
    public save(index: number, content: string): object {
        return {
            index,
            content
        }
    }

    @Emit()
    public complete(): number {
        return this.index
    }

    @Emit()
    public onAdd(content: string): Item {
        return {
            text: content.replace(/\s*/g, ""),
            complete: false
        }
    }

    protected render() {
        return (
            <div>
                {
                    this.edittingIndex == this.index
                        ?
                        (<div>
                            <a-input v-model={this.edittingContent} style='width: 200px;'></a-input>
                            <a-icon type='check' on-click={this.save.bind(this, this.index, this.edittingContent)}></a-icon>
                            <a-icon type='close' on-click={this.cancel}></a-icon>
                        </div>)
                        :
                        (<div>
                            <span on-click={this.complete} style={this.item.complete ? { textDecoration: 'line-through' } : {}}>{this.item.text}</span>
                            <a-icon type='edit' on-click={this.edit}></a-icon>
                        </div>)
                }

                <div v-show={this.length == (this.index + 1)}>
                    <a-input v-model={this.edittingContent} style='width: 200px;'></a-input>
                    <span type='check' on-click={this.onAdd.bind(this, this.edittingContent)}>添加</span>
                </div>
            </div>
        )
    }
}