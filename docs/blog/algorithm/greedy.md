# 贪心算法

## 1. 什么是贪⼼
贪⼼的本质是选择每⼀阶段的局部最优，从⽽达到全局最优。

>例如，有⼀堆钞票，你可以拿⾛⼗张，如果想达到最⼤的⾦额，你要怎么拿？指定每次拿最⼤的，最终结果就是拿⾛最⼤数额的钱。
每次拿最⼤的就是局部最优，最后拿⾛最⼤数额的钱就是推出全局最优。
再举⼀个例⼦如果是 有⼀堆盒⼦，你有⼀个背包体积为n，如何把背包尽可能装满，如果还每次选最⼤的盒⼦，就不⾏了。这时候就需要动态规划。

## 2. 贪⼼的套路
贪⼼算法并没有固定的套路。所以唯⼀的难点就是如何通过局部最优，推出整体最优。最好⽤的策略就是举反例，如果想不到反例，那么就试⼀试贪⼼吧。

## 3. 贪⼼⼀般解题步骤
贪⼼算法⼀般分为如下四步：
- 将问题分解为若⼲个⼦问题
- 找出适合的贪⼼策略
- 求解每⼀个⼦问题的最优解
- 将局部最优解堆叠成全局最优解

## 4. 实战
#### 4.1 455.分发饼⼲
::: tip
题⽬链接：https://leetcode-cn.com/problems/assign-cookies/
<br/>
假设你是⼀位很棒的家⻓，想要给你的孩⼦们⼀些⼩饼⼲。但是，每个孩⼦最多只能给⼀块饼⼲。
对每个孩⼦ i，都有⼀个胃⼝值 g[i]，这是能让孩⼦们满⾜胃⼝的饼⼲的最⼩尺⼨；并且每块饼⼲ j，都
有⼀个尺⼨ s[j] 。如果 s[j] >= g[i]，我们可以将这个饼⼲ j 分配给孩⼦ i ，这个孩⼦会得到满⾜。你的⽬
标是尽可能满⾜越多数量的孩⼦，并输出这个最⼤数值。
:::

为了了满⾜更多的⼩孩，就不要造成饼⼲尺⼨的浪费。⼤尺⼨的饼⼲既可以满⾜胃⼝⼤的孩⼦也可以满⾜胃⼝⼩的孩⼦，那么就应该优先满⾜胃⼝⼤的。
这⾥的局部最优就是⼤饼⼲喂给胃⼝⼤的，充分利⽤饼⼲尺⼨喂饱⼀个，全局最优就是喂饱尽可能多的⼩孩。
可以尝试使⽤贪⼼策略，先将饼⼲数组和⼩孩数组排序。然后从后向前遍历⼩孩数组，⽤⼤饼⼲优先满⾜胃⼝⼤的，并统计满⾜⼩孩数量。
```c++
class Solution {
public:
    int findContentChildren(vector<int>& g, vector<int>& s) {
        sort(g.begin(),g.end());
        sort(s.begin(),s.end());
        int index = 0;
        for(int i = 0;i < s.size();++i){
            if (index < g.size() && g[index] <= s[i]){
                index++;
            }
        }
        return index;
    }
};
```

```c++
// 时间复杂度：O(nlogn)
// 空间复杂度：O(1)
class Solution {
public:
    int findContentChildren(vector<int>& g, vector<int>& s) {
        sort(g.begin(), g.end());
        sort(s.begin(), s.end());
        int index = s.size() - 1; // 饼⼲数组的下表
        int result = 0;
        for (int i = g.size() - 1; i >= 0; i--) {
            if (index >= 0 && s[index] >= g[i]) {
                result++;
                index--;
            }
        }
        return result;
    }
};
```


#### 4.2 376. 摆动序列
::: tip
题⽬链接：https://leetcode-cn.com/problems/wiggle-subsequence/
<br/>
如果连续数字之间的差严格地在正数和负数之间交替，则数字序列称为摆动序列。第⼀个差（如果存在
的话）可能是正数或负数。少于两个元素的序列也是摆动序列。
:::

```c++
class Solution {
public:
    int wiggleMaxLength(vector<int>& nums) {
        if (nums.size() <= 1) return nums.size();
        int curDiff = 0; // 当前⼀对差值
        int preDiff = 0; // 前⼀对差值
        int result = 1; // 记录峰值个数，序列默认序列最右边有⼀个峰值
        for (int i = 0; i < nums.size() - 1; i++) {
            curDiff = nums[i + 1] - nums[i];
            // 出现峰值
            if ((curDiff > 0 && preDiff <= 0) || (preDiff >= 0 && curDiff < 0))={
                result++;
                preDiff = curDiff;
            }
        }
        return result;
    }
};
```

