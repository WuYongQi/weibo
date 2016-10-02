#!/usr/bin/env python
#-*- coding:utf-8 -*-
__author__ = 'Nick Suo'


class commentrespone:
    def __init__(self, commentret):
        pass


    def build_tree(self, comment_list):
        #     [{'user__user_id': 7, 'user__head_img': 'jenny/User_info/mm.jpeg', 'user__name': '珍妮', 'id': 14,
        #      'comment': '这个视频屌爆了', 'p_comment_id': None},
        #     {'user__user_id': 1, 'user__head_img': 'nick/User_info/mm.jpeg', 'user__name': 'nick', 'id': 15,
        #      'comment': '碉堡了二', 'p_comment_id': 14}]

        for comment_dic in comment_list:
            if not comment_dic['p_comment_id']:
                # 如果是根评论，添加到comment_dic[评论对象] ＝ {}
                comment_dic[comment_obj] = collections.OrderedDict()
            else:
                # 如果是回复的评论，则需要在 comment_dic 中找到其回复的评论
                tree_search(comment_dic, comment_obj)
        return comment_dic


    def tree_search(self, d_dic, comment_obj):
        # 在comment_dic中一个一个的寻找其回复的评论
        # 检查当前评论的 reply_id 和 comment_dic中已有评论的nid是否相同，
        #   如果相同，表示就是回复的此信息
        #   如果不同，则需要去 comment_dic 的所有子元素中寻找，一直找，如果一系列中未找，则继续向下找
        for k, v_dic in d_dic.items():
            # 找回复的评论，将自己添加到其对应的字典中，例如： {评论一： {回复一：{},回复二：{}}}
            if k[0] == comment_obj[2]:
                d_dic[k][comment_obj] = collections.OrderedDict()
                return
            else:
                # 在当前第一个跟元素中递归的去寻找父亲
                tree_search(d_dic[k], comment_obj)




# ul id="tree" class="filetree">
# // 	 <li>主节点内容
# // 		  <ul>
# // 		  	<li>主节点的子节点1</li>
# // 		  	<li>主节点的子节点2
# // 					<ul>
# // 						<li><span class="folder">主节点的子节点2的子节点</span></li>
# // 						<li>主节点的子节点2的子节点</li>
# // 						<li>主节点的子节点2的子节点</li>
# // 						<li>主节点的子节点2的子节点</li>
# // 					</ul>
# // 			  </li>
# // 			  <li>主节点的子节点3</li>
# // 			  <li>主节点的子节点4</li>
# // 		  </ul>
# // 	</li>
# // </ul>
