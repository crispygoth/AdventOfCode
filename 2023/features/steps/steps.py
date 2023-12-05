from behave import given, when, then
from click.testing import CliRunner
from hamcrest import assert_that, equal_to
from main import app
import typer
from pathlib import Path


@given('the input data')
def step_impl(context):
    context.input_text = context.text


@when('the {command} {subcommand} is run')
def step_impl(context, command, subcommand):  # noqa:F811
    runner = CliRunner()
    with runner.isolated_filesystem():
        Path('testinput.txt').write_text(context.input_text)

        context.cli_result = runner.invoke(
            typer.main.get_command(app),
            [command, subcommand, '--input-file', 'testinput.txt']
            )


@then('the command exits successfully')
def step_impl(context):  # noqa:F811
    assert_that(
        context.cli_result.exit_code,
        equal_to(0),
        context.cli_result.output
        )


@then('the result is {result}')
def step_impl(context, result):  # noqa:F811
    assert_that(context.cli_result.stdout.strip('\n'), equal_to(result))
