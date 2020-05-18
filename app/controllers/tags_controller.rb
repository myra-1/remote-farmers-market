class TagsController < ApplicationController

  def index
    @tags = Tag.all 
    render json: @tags
  end

  def show 
    render json: @tags, include: :post, status: :ok
    # if showing a particular tag this will show all posts related to tag
    # for a particular tag this feels more important in show than in index
  end

  def create
    @tag = Tag.new(tag_params)
    if @tag.save
    render json: @tag, status: :created, location: @tag
    else
      render json: @tag.errors, status: :unprocessable_entity
    end
  end
  # def update
  #   @post = Post.find(params[:post_id])
  #   @tag = @post.tags.find(tag_params)

  #   if @tag.update(tag_params)
  #     render json: @post
  #   else
  #     render json: @tag.errors, status: unprocessable_entity
  #   end
  # end

  # def destroy
  #   @post = Post.find(params[:post_id])
  #   @tag = @post.tags.find(params[:id])
  #   @tag.destroy
  # end

  private
  def tag_params
    params.require(:tag).permit(:name)
  end

end
