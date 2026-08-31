#!/usr/bin/env python3
"""Build MCP / Skills catalog JSON from awesome lists. Run from repo root."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MCP_README = Path("/tmp/awesome-mcp.md")
SKILLS_README = Path(
    "/Users/hooksvue/.cursor/projects/Users-hooksvue-Desktop-gotod-components-ui/agent-tools/4d55eace-570b-49ec-8ef4-e9305d184b56.txt"
)

CAT_ZH = {
    "Aggregators": "聚合网关",
    "Aerospace & Astrodynamics": "航天",
    "Agreements & Coordination": "协议协作",
    "Accessibility": "无障碍",
    "Art & Culture": "艺术文化",
    "Architecture & Design": "架构设计",
    "Biology, Medicine and Bioinformatics": "生物医疗",
    "Browser Automation": "浏览器",
    "Cloud Platforms": "云平台",
    "Code Execution": "代码执行",
    "Coding Agents": "编码代理",
    "Command Line": "命令行",
    "Communication": "通讯",
    "Conversational AI": "对话 AI",
    "Cryptography": "密码学",
    "Customer Data Platforms": "客户数据",
    "Databases": "数据库",
    "Data Platforms": "数据平台",
    "Developer Tools": "开发工具",
    "Delivery": "交付物流",
    "Data Science Tools": "数据科学",
    "Data Visualization": "数据可视化",
    "Embedded System": "嵌入式",
    "Education": "教育",
    "E-Commerce": "电商",
    "Environment & Nature": "环境自然",
    "File Systems": "文件系统",
    "Finance & Fintech": "金融",
    "Gaming": "游戏引擎",
    "Health & Wellness": "健康",
    "Home Automation": "智能家居",
    "Industrial & IoT": "工业 IoT",
    "Knowledge & Memory": "知识记忆",
    "Legal": "法律",
    "Location Services": "地理位置",
    "Marketing": "营销",
    "Monitoring": "监控",
    "Multimedia Process": "多媒体",
    "OS Automation": "系统自动化",
    "Podcasts": "播客",
    "Product Management": "产品管理",
    "Real Estate": "房地产",
    "Research": "研究",
    "end to end RAG platforms": "RAG",
    "Search & Data Extraction": "搜索抓取",
    "Security": "安全",
    "Social Media": "社交媒体",
    "Spirituality & Esoterica": "灵性",
    "Sports": "体育",
    "Support & Service Management": "客服运维",
    "Translation Services": "翻译",
    "Speech-to-Text": "语音转写",
    "Text-to-Speech": "语音合成",
    "Travel & Transportation": "出行交通",
    "Version Control": "版本控制",
    "Workplace & Productivity": "办公效率",
    "Other Tools and Integrations": "其他工具",
}


def strip_heading(text: str) -> str:
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"^[\W_🚀🔗🤝🎨📐📂🧬☁️👨‍💻🤖🖥️💬🗣️🔑👤🗄️📊🚚🛠️🧮📟🎓🛒🌳💰🎮🏥🏠🏭🧠⚖️🗺️🎯🎥🎙️📋🔬🔎🔒🌐🔮🏃🎧🌎🚆🔄🏢♿]+", "", text)
    return re.sub(r"\s+", " ", text).strip()


def clean_desc(text: str) -> str:
    text = re.sub(r"\[!\[.*?\]\(.*?\)\]\(.*?\)", "", text)
    text = re.sub(r"!\[.*?\]\(.*?\)", "", text)
    text = re.sub(r"[🐍📇🏎️🦀#️⃣☕🌊💎☁️🏠📟🍎🪟🐧🎖️🔗#️]+", " ", text)
    text = re.sub(r"`[^`]+`", "", text)
    text = re.sub(r"\s+", " ", text).strip(" -–—")
    if len(text) > 140:
        text = text[:137].rstrip() + "…"
    return text


def github_repo(url: str) -> str:
    match = re.search(r"github\.com/([^/#\s]+/[^/#\s]+)", url)
    if not match:
        return ""
    return match.group(1).rstrip(".git")


def parse_mcp(md: str) -> list:
    start = md.find("## Server Implementations")
    end = md.find("\n## Frameworks")
    body = md[start : end if end > start else None]
    category = "聚合网关"
    groups: dict[str, list] = {}
    order: list[str] = []
    for line in body.splitlines():
        heading = re.match(r"^###\s+(.+)$", line)
        if heading:
            raw = strip_heading(heading.group(1))
            if raw.startswith("Official prompt"):
                break
            category = CAT_ZH.get(raw, raw)
            if category not in groups:
                groups[category] = []
                order.append(category)
            continue
        match = re.match(r"^- \[([^\]]+)\]\((https?://[^)\s]+)\)(.*)$", line)
        if not match:
            continue
        name, url, rest = match.group(1).strip(), match.group(2).strip(), match.group(3)
        desc = clean_desc(rest)
        tags = ["MCP"]
        blob = f"{name} {url} {desc}".lower()
        if "godot" in blob:
            tags.append("Godot")
        if category not in groups:
            groups[category] = []
            order.append(category)
        groups[category].append([name, desc or name, url, github_repo(url), *tags])
    return [(cat, cat, groups[cat]) for cat in order if groups[cat]]


def parse_skills_tables(md: str) -> list:
    groups: dict[str, list] = {}
    order: list[str] = []
    category = "精选"
    skip = {"30 秒上手建议", "快速安装", "技能列表", "Skill 最佳实践"}
    for line in md.splitlines():
        heading = re.match(r"^###\s+(.+)$", line)
        if heading:
            raw = strip_heading(heading.group(1))
            if any(token in raw for token in skip):
                category = None
                continue
            category = raw
            if category not in groups:
                groups[category] = []
                order.append(category)
            continue
        if category is None:
            continue
        match = re.match(r"^\|\s*\[([^\]]+)\]\((https?://[^)\s]+)\)\s*\|\s*(.+?)\s*\|", line)
        if not match:
            continue
        name, url, desc = match.group(1).strip(), match.group(2).strip(), match.group(3)
        desc = re.sub(r"\s*\|.*$", "", desc).strip()
        desc = clean_desc(desc)
        groups[category].append([name, desc or name, url, github_repo(url), "Skill"])
    return [(cat, cat, groups[cat]) for cat in order if groups[cat]]


def prepend_items(groups: list, title: str, items: list) -> list:
    return [(title, title, items)] + groups


def inject_into(groups: list, title: str, extras: list) -> list:
    out = []
    found = False
    for zh, en, items in groups:
        if zh == title:
            seen = {row[2] for row in extras}
            merged = extras + [row for row in items if row[2] not in seen]
            out.append((zh, en, merged))
            found = True
        else:
            out.append((zh, en, items))
    if not found:
        out.insert(0, (title, title, extras))
    return out


def write_js(path: Path, global_name: str, payload: dict) -> None:
    path.write_text(
        f"window.{global_name} = {json.dumps(payload, ensure_ascii=False, separators=(',', ':'))};\n",
        encoding="utf-8",
    )


def main() -> None:
    mcp_groups = parse_mcp(MCP_README.read_text(encoding="utf-8"))
    skills_groups = parse_skills_tables(SKILLS_README.read_text(encoding="utf-8"))

    session = [
        ["Cursor IDE Browser", "本会话已接入。改文档站后用 navigate → lock → snapshot/click → screenshot 验证真实交互。", "https://docs.cursor.com/context/model-context-protocol", "", "ACTIVE", "Browser"],
        ["Cursor App Control", "本会话已接入。控制工作区、对话、规则与本地任务入口。", "https://docs.cursor.com/", "", "ACTIVE"],
        ["Cursor Native", "CreateGoal / GenerateImage / UpdateGoal。适合把 MCP 结果做成可视化产物。", "https://docs.cursor.com/", "", "ACTIVE"],
        ["CodeGraph", "仓库有 .codegraph/ 时先定位符号与调用链，再去 grep。", "https://docs.cursor.com/", "", "RECOMMENDED"],
    ]
    official = [
        ["MCP 官方参考集合", "Anthropic 维护的参考 Server 与 SDK 示例。生产请评估安全模型，不要直接当业务服务。", "https://github.com/modelcontextprotocol/servers", "modelcontextprotocol/servers", "官方"],
        ["Filesystem", "受控本地文件读写，可配置允许目录。", "https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem", "modelcontextprotocol/servers", "官方"],
        ["Git", "读取、搜索、操作本地 Git 仓库。", "https://github.com/modelcontextprotocol/servers/tree/main/src/git", "modelcontextprotocol/servers", "官方"],
        ["Fetch", "抓取网页并转成适合模型阅读的内容。", "https://github.com/modelcontextprotocol/servers/tree/main/src/fetch", "modelcontextprotocol/servers", "官方"],
        ["GitHub MCP", "Issues、PR、仓库操作。官方实现已迁到 github/github-mcp-server。", "https://github.com/github/github-mcp-server", "github/github-mcp-server", "官方"],
        ["PostgreSQL", "参考实现已归档到 servers-archived，只读查库与 schema。", "https://github.com/modelcontextprotocol/servers-archived/tree/main/src/postgres", "modelcontextprotocol/servers-archived", "归档"],
        ["SQLite", "参考实现已归档。本地 SQLite 查询与分析。", "https://github.com/modelcontextprotocol/servers-archived/tree/main/src/sqlite", "modelcontextprotocol/servers-archived", "归档"],
        ["Brave Search", "已由 Brave 官方服务器接手。", "https://github.com/brave/brave-search-mcp-server", "brave/brave-search-mcp-server", "搜索"],
        ["Memory", "基于知识图谱的持久记忆。", "https://github.com/modelcontextprotocol/servers/tree/main/src/memory", "modelcontextprotocol/servers", "官方"],
        ["Sequential Thinking", "把推理拆成可反思的思考步骤。", "https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking", "modelcontextprotocol/servers", "官方"],
    ]
    godot = [
        ["Godot-MCP · IvanMurzak", "Godot 编辑器 MCP。本仓库优先看这条与下面几条 Godot 实现。", "https://github.com/IvanMurzak/Godot-MCP", "IvanMurzak/Godot-MCP", "Godot"],
        ["godot-mcp · tugcantopaloglu", "社区 Godot MCP，覆盖场景、节点与编辑器操作。", "https://github.com/tugcantopaloglu/godot-mcp", "tugcantopaloglu/godot-mcp", "Godot"],
        ["Coding-Solo/godot-mcp", "编辑、运行、调试和管理 Godot 场景。", "https://github.com/Coding-Solo/godot-mcp", "Coding-Solo/godot-mcp", "Godot"],
        ["beckett-godot-mcp", "零 sidecar 的 Godot 4 编辑器插件，在编辑器内提供 Streamable HTTP MCP。", "https://github.com/beckettlab/beckett-godot-mcp", "beckettlab/beckett-godot-mcp", "Godot"],
        ["godot-forge", "Godot 4 开发伴侣：测试、API 文档、场景解析、截图与 LSP。", "https://github.com/gregario/godot-forge", "gregario/godot-forge", "Godot"],
        ["godot-mcp-runtime", "运行时 UDP 桥：输入模拟、截图、UI 发现、热执行 GDScript。", "https://github.com/Erodenn/godot-mcp-runtime", "Erodenn/godot-mcp-runtime", "Godot"],
        ["better-godot-mcp", "18 个组合工具覆盖场景、节点、GDScript、着色器、动画、UI 与信号。", "https://github.com/n24q02m/better-godot-mcp", "n24q02m/better-godot-mcp", "Godot"],
        ["godot-mcp-pro", "84 个工具：场景、脚本、动画、Tilemap、着色器、输入模拟与运行时调试。", "https://github.com/youichi-uda/godot-mcp-pro", "youichi-uda/godot-mcp-pro", "Godot"],
    ]
    mcp_groups = prepend_items(mcp_groups, "官方参考", official)
    mcp_groups = prepend_items(mcp_groups, "本会话", session)
    mcp_groups = inject_into(mcp_groups, "游戏引擎", godot)

    mcp_hubs = [
        ["MCPServers.org", "9,800+ 官方与社区 MCP，按分类检索，附带一键配置。", "https://mcpservers.org", "INDEX"],
        ["Smithery.ai", "MCP Server 注册中心，支持一键安装与在线 CLI 调试。", "https://smithery.ai", "INDEX"],
        ["Glama Registry", "实时抓取全网高星 MCP，并与 awesome 列表同步。", "https://glama.ai/mcp/servers", "INDEX"],
        ["MCP.so", "主流客户端可用的 MCP 插件分类大厅。", "https://mcp.so", "INDEX"],
        ["Puch Directory", "社区维护的 MCP 插件与服务聚合。", "https://puch.ai/mcp", "INDEX"],
        ["Official Registry", "官方 REST 注册表，聚合站应定期同步这里。", "https://registry.modelcontextprotocol.io", "SPEC"],
        ["punkpeye/awesome-mcp-servers", "更新最频繁的 MCP 精选列表，本页卡片主要来自这份 README。", "https://github.com/punkpeye/awesome-mcp-servers", "GITHUB"],
        ["wong2/awesome-mcp-servers", "国内开发者高赞维护的 MCP 服务清单。", "https://github.com/wong2/awesome-mcp-servers", "GITHUB"],
        ["appcypher/awesome-mcp-servers", "按功能领域划分的 MCP 聚合列表。", "https://github.com/appcypher/awesome-mcp-servers", "GITHUB"],
        ["modelcontextprotocol/servers", "官方参考 Server 与 SDK 集合。", "https://github.com/modelcontextprotocol/servers", "GITHUB"],
    ]

    local_skills = [
        ["mcp-ui-verify", "本仓库项目 Skill：改文档站 / Library / Demo 后必须用 Browser MCP 走真实交互。", "../mcp/", ".cursor/skills/mcp-ui-verify", "PROJECT"],
        ["create-skill", "编写 Cursor Agent Skill：YAML、触发描述与存放位置。", "https://docs.cursor.com/", "~/.cursor/skills-cursor/create-skill", "CURSOR"],
        ["canvas", "独立分析产物做成会话旁 Canvas，不要往聊天里堆大表。", "https://docs.cursor.com/", "~/.cursor/skills-cursor/canvas", "CURSOR"],
        ["game-ui-workflow", "游戏 UI 端到端：GDD → 规范 → 生图 → 拆解 → Atlas → 引擎 JSON。", "../vue-components.html", "~/.codex/skills/game-ui-workflow", "GAME UI"],
        ["Godot-Claude-Skills", "Godot 向的 Claude Skills 集合，和 Godot MCP 配套看。", "https://github.com/Randroids-Dojo/Godot-Claude-Skills", "Randroids-Dojo/Godot-Claude-Skills", "Godot"],
        ["anthropics/skills", "Claude 官方 Agent Skills 与工作流模板。", "https://github.com/anthropics/skills", "anthropics/skills", "官方"],
        ["mcp-builder", "Anthropic 示例：教代理如何生成 MCP Server。", "https://github.com/anthropics/skills/tree/main/skills/mcp-builder", "anthropics/skills", "官方"],
        ["frontend-design", "Anthropic 示例：前端视觉与交互设计约束。", "https://github.com/anthropics/skills/tree/main/skills/frontend-design", "anthropics/skills", "官方"],
        ["webapp-testing", "Anthropic 示例：Web 应用测试流程。", "https://github.com/anthropics/skills/tree/main/skills/webapp-testing", "anthropics/skills", "官方"],
        ["skill-creator", "Anthropic 示例：如何写一条合格 Skill。", "https://github.com/anthropics/skills/tree/main/skills/skill-creator", "anthropics/skills", "官方"],
    ]
    skills_groups = prepend_items(skills_groups, "本仓库与官方", local_skills)

    skills_hubs = [
        ["SkillsMP", "Agent Skills 分享市场，号称百万级提示词技能索引。", "https://skillsmp.com", "INDEX"],
        ["Claude Marketplace", "面向 Claude / Agent 的 Skills 与 MCP 工具集。", "https://www.claudemarketplace.net", "INDEX"],
        ["agentskills.io", "Agent Skills 开放规范。", "https://agentskills.io", "SPEC"],
        ["anthropics/skills", "Claude 官方技能与工作流模板仓库。", "https://github.com/anthropics/skills", "GITHUB"],
        ["claude-code-skills-zh", "中文社区 424+ Claude Skills 聚合，本页精选卡片主要来自这里。", "https://github.com/laolaoshiren/claude-code-skills-zh", "GITHUB"],
        ["VoltAgent/awesome-agent-skills", "1,000+ Agent Skills 精选，兼容 Claude / Codex / Cursor。", "https://github.com/VoltAgent/awesome-agent-skills", "GITHUB"],
        ["ComposioHQ/awesome-claude-skills", "按研究、设计、生产力分类的 Claude Skills 导航。", "https://github.com/ComposioHQ/awesome-claude-skills", "GITHUB"],
    ]

    mcp_count = sum(len(g[2]) for g in mcp_groups)
    skills_count = sum(len(g[2]) for g in skills_groups)
    write_js(ROOT / "library/js/mcp-data.js", "GOTOD_MCP_CATALOG", {
        "kind": "mcp",
        "count": mcp_count,
        "source": "punkpeye/awesome-mcp-servers",
        "hubs": mcp_hubs,
        "groups": mcp_groups,
    })
    write_js(ROOT / "library/js/skills-data.js", "GOTOD_SKILLS_CATALOG", {
        "kind": "skills",
        "count": skills_count,
        "source": "laolaoshiren/claude-code-skills-zh",
        "hubs": skills_hubs,
        "groups": skills_groups,
    })
    print(f"mcp {mcp_count} in {len(mcp_groups)} groups")
    print(f"skills {skills_count} in {len(skills_groups)} groups")


if __name__ == "__main__":
    main()
